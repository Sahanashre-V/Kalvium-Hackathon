import re
from typing import Any

from sqlalchemy.orm import Session as DbSession

from app.models import Analysis, Assessment, Lesson, Progress, Quiz, Roadmap, Session, User
from app.services.ai_analysis_service import analyze_assessment
from app.schemas.learning import (
    AssessmentGenerateRequest,
    AssessmentSubmitRequest,
    QuizGenerateRequest,
    QuizSubmitRequest,
    RoadmapGenerateRequest,
    TopicSelectRequest,
)
from app.services.mock_learning_data import (
    ASSESSMENT_QUESTIONS,
    LESSONS,
    QUIZ_QUESTIONS,
    TOPIC_ALIASES,
    TOPIC_ORDER,
)


class LearningFlowError(Exception):
    def __init__(self, status_code: int, detail: str) -> None:
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def _public_question(question: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": question["id"],
        "topic": question["topic"],
        "subtopic": question["subtopic"],
        "difficulty": question["difficulty"],
        "question": question["question"],
        "options": question["options"],
    }


def _answer_key(value: str | None) -> str:
    return _slug(value or "")


class LearningFlowService:
    def select_topic(self, db: DbSession, payload: TopicSelectRequest) -> dict[str, Any]:
        domain = self._resolve_domain(payload.topic)
        user = self._get_or_create_user(db, payload.user_id)
        session = Session(
            user_id=user.id,
            topic=domain,
            goal=payload.goal,
            status="active",
        )
        db.add(session)
        db.commit()
        db.refresh(session)
        # Auto-generate a lightweight pre-assessment for the session
        try:
            questions = ASSESSMENT_QUESTIONS.get(domain, [])
            assessment = Assessment(
                session_id=session.id,
                topic=session.topic,
                questions_json=questions,
                answers_json=None,
                score=None,
            )
            db.add(assessment)
            db.commit()
            db.refresh(assessment)
            assessment_payload = {
                "assessment_id": assessment.id,
                "total_questions": len(questions),
                "questions": [_public_question(q) for q in questions],
            }
        except Exception:
            assessment_payload = {"assessment_id": None, "total_questions": None, "questions": None}

        return {
            "status": "success",
            "message": f"{domain} learning session created",
            "session_id": session.id,
            "topic": domain,
            "normalized_topic": _slug(domain),
            "available_topics": TOPIC_ORDER.get(domain, []),
            **assessment_payload,
        }

    def generate_assessment(self, db: DbSession, payload: AssessmentGenerateRequest) -> dict[str, Any]:
        session = self._get_session(db, payload.session_id)
        questions = ASSESSMENT_QUESTIONS[session.topic]
        assessment = Assessment(
            session_id=session.id,
            topic=session.topic,
            questions_json=questions,
            answers_json=None,
            score=None,
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)
        return {
            "status": "success",
            "session_id": session.id,
            "assessment_id": assessment.id,
            "topic": session.topic,
            "total_questions": len(questions),
            "questions": [_public_question(question) for question in questions],
        }

    def submit_assessment(self, db: DbSession, payload: AssessmentSubmitRequest) -> dict[str, Any]:
        session = self._get_session(db, payload.session_id)
        assessment = self._get_assessment(db, payload.assessment_id, session.id)
        result = self._score_questions(assessment.questions_json, payload.answers)
        assessment.answers_json = payload.answers
        assessment.score = result["score"]
        analysis = self._create_analysis(db, session, assessment, result)
        db.commit()
        db.refresh(assessment)
        return {
            "status": "success",
            "session_id": session.id,
            "score": result["score"],
            "total_questions": result["total_questions"],
            "correct_count": result["correct_count"],
            "strong_topics": analysis.strengths_json,
            "weak_topics": analysis.weaknesses_json,
            "topic_scores": result["topic_scores"],
            "message": self._score_message(result["score"]),
        }

    def get_analysis(self, db: DbSession, session_id: int) -> dict[str, Any]:
        session = self._get_session(db, session_id)
        analysis = (
            db.query(Analysis)
            .filter(Analysis.session_id == session.id)
            .order_by(Analysis.created_at.desc(), Analysis.id.desc())
            .first()
        )
        if analysis is None:
            raise LearningFlowError(404, "Submit an assessment before requesting analysis")
        recommendations = analysis.recommendations_json or []
        topic_scores = {item["topic"]: item["score"] for item in recommendations}
        neutral_topics = [
            item["topic"]
            for item in recommendations
            if item["topic"] not in analysis.strengths_json and item["topic"] not in analysis.weaknesses_json
        ]
        return {
            "status": "success",
            "session_id": session.id,
            "topic": session.topic,
            "strong_topics": analysis.strengths_json or [],
            "weak_topics": analysis.weaknesses_json or [],
            "neutral_topics": neutral_topics,
            "topic_scores": topic_scores,
            "summary": analysis.summary,
            "recommendations": recommendations,
        }

    def generate_roadmap(self, db: DbSession, payload: RoadmapGenerateRequest) -> dict[str, Any]:
        session = self._get_session(db, payload.session_id)
        analysis = self.get_analysis(db, session.id)
        weak = analysis["weak_topics"]
        strong = analysis["strong_topics"]
        neutral = [
            topic for topic in TOPIC_ORDER[session.topic] if topic not in weak and topic not in strong
        ]
        ordered_names = weak + neutral + strong
        milestones = [
            {
                "order": index,
                "topic": topic,
                "priority": self._roadmap_priority(topic, weak, strong),
                "reason": self._roadmap_reason(topic, weak, strong),
                "status": "pending",
            }
            for index, topic in enumerate(ordered_names, start=1)
        ]
        roadmap = Roadmap(
            session_id=session.id,
            title=f"{session.topic} personalized roadmap",
            description="Mock roadmap generated from assessment strengths and weaknesses.",
            milestones_json=milestones,
        )
        db.add(roadmap)
        db.flush()
        for milestone in milestones:
            lesson_data = LESSONS[session.topic][milestone["topic"]]
            lesson = Lesson(
                roadmap_id=roadmap.id,
                title=f"{milestone['topic']} Lesson",
                topic=milestone["topic"],
                content=lesson_data["explanation"],
                resources_json=[
                    {"type": "example", "title": example}
                    for example in lesson_data["examples"]
                ],
                order_index=milestone["order"],
            )
            db.add(lesson)
        db.commit()
        db.refresh(roadmap)
        skipped_topics = [topic for topic in strong if topic not in weak]
        next_topic = self._next_topic_from_milestones(db, session, milestones)
        return {
            "status": "success",
            "session_id": session.id,
            "roadmap_id": roadmap.id,
            "topic": session.topic,
            "ordered_topics": milestones,
            "skipped_topics": skipped_topics,
            "next_topic": next_topic,
        }

    def get_lesson(self, db: DbSession, topic: str, session_id: int | None = None) -> dict[str, Any]:
        session = self._get_session(db, session_id) if session_id is not None else None
        domain = session.topic if session is not None else self._infer_domain_for_lesson(topic)
        lesson_topic = self._resolve_lesson_topic(domain, topic)
        lesson_data = LESSONS[domain][lesson_topic]
        return {
            "status": "success",
            "session_id": session.id if session is not None else None,
            "topic": lesson_topic,
            "domain_topic": domain,
            "explanation": lesson_data["explanation"],
            "examples": lesson_data["examples"],
            "key_points": lesson_data["key_points"],
        }

    def generate_quiz(self, db: DbSession, payload: QuizGenerateRequest) -> dict[str, Any]:
        session = self._get_session(db, payload.session_id)
        lesson_topic = payload.topic or self.get_dashboard(db, session.id)["next_topic"]
        if lesson_topic is None:
            raise LearningFlowError(409, "No quiz topic is available for this session")
        lesson_topic = self._resolve_lesson_topic(session.topic, lesson_topic)
        lesson = self._get_or_create_lesson(db, session, lesson_topic)
        questions = QUIZ_QUESTIONS[session.topic][lesson_topic]
        quiz = Quiz(
            lesson_id=lesson.id,
            title=f"{lesson_topic} Quiz",
            questions_json=questions,
            answers_json=None,
            score=None,
        )
        db.add(quiz)
        db.commit()
        db.refresh(quiz)
        return {
            "status": "success",
            "session_id": session.id,
            "quiz_id": quiz.id,
            "topic": lesson_topic,
            "total_questions": len(questions),
            "questions": [_public_question(question) for question in questions],
        }

    def submit_quiz(self, db: DbSession, payload: QuizSubmitRequest) -> dict[str, Any]:
        session = self._get_session(db, payload.session_id)
        quiz = self._get_quiz_for_session(db, payload.quiz_id, session.id)
        result = self._score_questions(quiz.questions_json, payload.answers)
        weak_areas = [
            topic for topic, score in result["topic_scores"].items() if score < 70
        ]
        quiz.answers_json = payload.answers
        quiz.score = result["score"]
        self._upsert_progress(db, session, quiz.lesson, result["score"])
        db.commit()
        return {
            "status": "success",
            "session_id": session.id,
            "quiz_id": quiz.id,
            "score": result["score"],
            "total_questions": result["total_questions"],
            "correct_count": result["correct_count"],
            "strong_topics": [topic for topic, score in result["topic_scores"].items() if score >= 70],
            "weak_topics": weak_areas,
            "topic_scores": result["topic_scores"],
            "weak_areas": weak_areas,
            "message": self._score_message(result["score"]),
        }

    def get_dashboard(self, db: DbSession, session_id: int) -> dict[str, Any]:
        session = self._get_session(db, session_id)
        analysis = self._latest_analysis_payload(db, session)
        roadmap = (
            db.query(Roadmap)
            .filter(Roadmap.session_id == session.id)
            .order_by(Roadmap.created_at.desc(), Roadmap.id.desc())
            .first()
        )
        milestones = roadmap.milestones_json if roadmap else [
            {"order": index, "topic": topic, "priority": "normal", "reason": "Default topic order", "status": "pending"}
            for index, topic in enumerate(TOPIC_ORDER[session.topic], start=1)
        ]
        progress_rows = (
            db.query(Progress)
            .filter(Progress.session_id == session.id)
            .all()
        )
        completed_topics = {
            row.lesson.topic
            for row in progress_rows
            if row.lesson is not None and row.status == "completed"
        }
        next_topic = self._next_topic_from_milestones(db, session, milestones)
        total_topics = len(milestones)
        completed_count = len(completed_topics)
        return {
            "status": "success",
            "session_id": session.id,
            "topic": session.topic,
            "progress": {
                "completed_topics": sorted(completed_topics),
                "completed_count": completed_count,
                "total_topics": total_topics,
                "completion_percent": round((completed_count / total_topics) * 100, 2) if total_topics else 0.0,
                "topics": [
                    {
                        **milestone,
                        "status": "completed" if milestone["topic"] in completed_topics else milestone["status"],
                    }
                    for milestone in milestones
                ],
            },
            "next_topic": next_topic,
            "strong_topics": analysis["strong_topics"],
            "weak_topics": analysis["weak_topics"],
        }

    def _get_or_create_user(self, db: DbSession, user_id: int | None) -> User:
        if user_id is not None:
            user = db.get(User, user_id)
            if user is None:
                raise LearningFlowError(404, "User not found")
            return user
        user = db.query(User).filter(User.email == "demo@kalvium.local").first()
        if user is None:
            user = User(name="Demo Learner", email="demo@kalvium.local", hashed_password=None)
            db.add(user)
            db.flush()
        return user

    def _resolve_domain(self, topic: str) -> str:
        normalized = _slug(topic)
        domain = TOPIC_ALIASES.get(normalized)
        if domain is None:
            raise LearningFlowError(400, "Unsupported topic. Choose one of: DSA, React, ML")
        return domain

    def _infer_domain_for_lesson(self, topic: str) -> str:
        normalized = _slug(topic)
        alias = TOPIC_ALIASES.get(normalized)
        if alias is not None:
            return alias
        matches = [
            domain
            for domain, lessons in LESSONS.items()
            if any(_slug(lesson_topic) == normalized for lesson_topic in lessons)
        ]
        if not matches:
            raise LearningFlowError(404, "Lesson topic not found")
        if len(matches) > 1:
            raise LearningFlowError(400, "Lesson topic is ambiguous; pass session_id")
        return matches[0]

    def _resolve_lesson_topic(self, domain: str, topic: str) -> str:
        normalized = _slug(topic)
        if TOPIC_ALIASES.get(normalized) == domain:
            return TOPIC_ORDER[domain][0]
        for lesson_topic in TOPIC_ORDER[domain]:
            if _slug(lesson_topic) == normalized:
                return lesson_topic
        raise LearningFlowError(400, f"{topic} does not belong to the {domain} learning session")

    def _get_session(self, db: DbSession, session_id: int | None) -> Session:
        if session_id is None:
            raise LearningFlowError(400, "session_id is required")
        session = db.get(Session, session_id)
        if session is None:
            raise LearningFlowError(404, "Session not found")
        if session.topic not in TOPIC_ORDER:
            raise LearningFlowError(400, "Session topic is not supported by the learning flow")
        return session

    def _get_assessment(self, db: DbSession, assessment_id: int, session_id: int) -> Assessment:
        assessment = db.get(Assessment, assessment_id)
        if assessment is None or assessment.session_id != session_id:
            raise LearningFlowError(404, "Assessment not found for this session")
        return assessment

    def _get_quiz_for_session(self, db: DbSession, quiz_id: int, session_id: int) -> Quiz:
        quiz = db.get(Quiz, quiz_id)
        if quiz is None or quiz.lesson is None or quiz.lesson.roadmap.session_id != session_id:
            raise LearningFlowError(404, "Quiz not found for this session")
        return quiz

    def _score_questions(self, questions: list[dict[str, Any]], answers: dict[str, str]) -> dict[str, Any]:
        correct_count = 0
        topic_totals: dict[str, int] = {}
        topic_correct: dict[str, int] = {}
        for question in questions:
            subtopic = question["subtopic"]
            topic_totals[subtopic] = topic_totals.get(subtopic, 0) + 1
            selected = answers.get(question["id"])
            is_correct = _answer_key(selected) == _answer_key(question["answer"])
            if is_correct:
                correct_count += 1
                topic_correct[subtopic] = topic_correct.get(subtopic, 0) + 1
        total = len(questions)
        topic_scores = {
            topic: round((topic_correct.get(topic, 0) / count) * 100, 2)
            for topic, count in topic_totals.items()
        }
        return {
            "score": round((correct_count / total) * 100, 2) if total else 0.0,
            "correct_count": correct_count,
            "total_questions": total,
            "topic_scores": topic_scores,
        }

    def _create_analysis(
        self,
        db: DbSession,
        session: Session,
        assessment: Assessment,
        result: dict[str, Any],
    ) -> Analysis:
        # Use AI analysis service to create a richer, personalized analysis.
        try:
            questions = assessment.questions_json or []
            answers = assessment.answers_json or []
            ai_result = analyze_assessment(session.topic, questions, answers, result.get("score", 0.0))
            strengths = ai_result.get("strengths", [])
            weaknesses = ai_result.get("weaknesses", [])
            review_topics = ai_result.get("review_topics", [])
            confidence = ai_result.get("confidence_score", int(round(result.get("score", 0.0))))
            recommended_mode = ai_result.get("recommended_learning_mode", "Mixed")
            recommended_start = ai_result.get("recommended_start_topic") or (weaknesses[0] if weaknesses else None)
            reasoning = ai_result.get("reasoning", "")

            # Build recommendations array from topic_scores if available, fall back to AI lists
            topic_scores = result.get("topic_scores", {})
            recommendations = []
            if topic_scores:
                for topic, score_value in topic_scores.items():
                    classification = "strong" if topic in strengths else ("weak" if topic in weaknesses else "neutral")
                    recommendations.append({
                        "topic": topic,
                        "score": score_value,
                        "classification": classification,
                        "action": self._recommendation_action(topic, score_value),
                    })
            else:
                # If no topic scores, synthesize from AI lists
                for topic in strengths:
                    recommendations.append({"topic": topic, "score": None, "classification": "strong", "action": self._recommendation_action(topic, 100)})
                for topic in weaknesses:
                    recommendations.append({"topic": topic, "score": None, "classification": "weak", "action": self._recommendation_action(topic, 0)})

            summary = f"AI analysis: {reasoning}"

            analysis = Analysis(
                session_id=session.id,
                assessment_id=assessment.id,
                summary=summary,
                strengths_json=strengths,
                weaknesses_json=weaknesses,
                recommendations_json=recommendations,
                score=result.get("score", 0.0),
            )
            db.add(analysis)
            return analysis
        except Exception as e:
            # If AI service fails for any reason, fall back to deterministic behavior
            logging.exception("AI analysis failed, falling back to baseline analysis: %s", e)
            weak = [topic for topic, score in result["topic_scores"].items() if score < 60]
            strong = [topic for topic, score in result["topic_scores"].items() if score >= 75]
            recommendations = [
                {
                    "topic": topic,
                    "score": score,
                    "classification": "strong" if topic in strong else "weak" if topic in weak else "neutral",
                    "action": self._recommendation_action(topic, score),
                }
                for topic, score in result["topic_scores"].items()
            ]
            summary = (
                f"Assessment score is {result['score']}%. "
                f"Focus first on {', '.join(weak) if weak else 'mixed practice'}, "
                f"then reinforce {', '.join(strong) if strong else 'core concepts'}."
            )
            analysis = Analysis(
                session_id=session.id,
                assessment_id=assessment.id,
                summary=summary,
                strengths_json=strong,
                weaknesses_json=weak,
                recommendations_json=recommendations,
                score=result["score"],
            )
            db.add(analysis)
            return analysis

    def _latest_analysis_payload(self, db: DbSession, session: Session) -> dict[str, Any]:
        analysis = (
            db.query(Analysis)
            .filter(Analysis.session_id == session.id)
            .order_by(Analysis.created_at.desc(), Analysis.id.desc())
            .first()
        )
        if analysis is None:
            return {"strong_topics": [], "weak_topics": []}
        return {
            "strong_topics": analysis.strengths_json or [],
            "weak_topics": analysis.weaknesses_json or [],
        }

    def _get_or_create_lesson(self, db: DbSession, session: Session, lesson_topic: str) -> Lesson:
        lesson = (
            db.query(Lesson)
            .join(Roadmap)
            .filter(Roadmap.session_id == session.id, Lesson.topic == lesson_topic)
            .order_by(Lesson.created_at.desc(), Lesson.id.desc())
            .first()
        )
        if lesson is not None:
            return lesson
        roadmap = Roadmap(
            session_id=session.id,
            title=f"{session.topic} quick lesson roadmap",
            description="Auto-created for quiz generation.",
            milestones_json=[
                {"order": 1, "topic": lesson_topic, "priority": "high", "reason": "Selected quiz topic", "status": "pending"}
            ],
        )
        db.add(roadmap)
        db.flush()
        lesson_data = LESSONS[session.topic][lesson_topic]
        lesson = Lesson(
            roadmap_id=roadmap.id,
            title=f"{lesson_topic} Lesson",
            topic=lesson_topic,
            content=lesson_data["explanation"],
            resources_json=[],
            order_index=1,
        )
        db.add(lesson)
        db.flush()
        return lesson

    def _upsert_progress(self, db: DbSession, session: Session, lesson: Lesson, score: float) -> None:
        progress = (
            db.query(Progress)
            .filter(
                Progress.session_id == session.id,
                Progress.user_id == session.user_id,
                Progress.lesson_id == lesson.id,
            )
            .first()
        )
        if progress is None:
            progress = Progress(
                session_id=session.id,
                user_id=session.user_id,
                lesson_id=lesson.id,
                status="completed",
                completion_percent=100.0,
                score=score,
            )
            db.add(progress)
            return
        progress.status = "completed"
        progress.completion_percent = 100.0
        progress.score = score

    def _next_topic_from_milestones(
        self,
        db: DbSession,
        session: Session,
        milestones: list[dict[str, Any]],
    ) -> str | None:
        completed = {
            row.lesson.topic
            for row in db.query(Progress).filter(Progress.session_id == session.id).all()
            if row.lesson is not None and row.status == "completed"
        }
        for milestone in milestones:
            if milestone["topic"] not in completed and milestone["priority"] != "optional":
                return milestone["topic"]
        for milestone in milestones:
            if milestone["topic"] not in completed:
                return milestone["topic"]
        return None

    def _roadmap_priority(self, topic: str, weak: list[str], strong: list[str]) -> str:
        if topic in weak:
            return "high"
        if topic in strong:
            return "optional"
        return "normal"

    def _roadmap_reason(self, topic: str, weak: list[str], strong: list[str]) -> str:
        if topic in weak:
            return "Weak topic from assessment"
        if topic in strong:
            return "Strong topic; review later if time allows"
        return "Balanced practice topic"

    def _recommendation_action(self, topic: str, score: float) -> str:
        if score < 60:
            return f"Start with the {topic} lesson and complete a quiz."
        if score >= 75:
            return f"Keep {topic} as optional review."
        return f"Practice {topic} after weak topics."

    def _score_message(self, score: float) -> str:
        if score >= 80:
            return "Great work. You can move quickly through the roadmap."
        if score >= 60:
            return "Good baseline. Focus on weak areas before advancing."
        return "Start with fundamentals and retake practice after lessons."
