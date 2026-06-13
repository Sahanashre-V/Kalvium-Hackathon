"""Local AI analysis service (deterministic).

This module produces a deterministic analysis from assessment data without calling external APIs.
It mirrors the same output schema used elsewhere in the app so no other changes are required.
"""

from typing import Any, Dict, List


def analyze_assessment(topic: str, questions: List[Dict[str, Any]], answers: List[Any], score: float) -> Dict[str, Any]:
    """
    Produce a deterministic, per-topic analysis from questions and answers.

    - `questions` is a list of question dicts (may include keys `topic`, `subtopic`, `answer`).
    - `answers` is a list of the learner's answers aligned with `questions`.
    - `score` is the overall assessment score (0-100).

    Returns a dict with keys: strengths, weaknesses, review_topics, confidence_score,
    recommended_learning_mode, recommended_start_topic, reasoning
    """

    # Aggregate per-topic totals and correct counts
    topic_counts: Dict[str, int] = {}
    topic_correct: Dict[str, int] = {}
    for q, a in zip(questions, answers):
        # prefer explicit `topic` then `subtopic` then fallback to 'General'
        t = q.get("topic") or q.get("subtopic") or "General"
        topic_counts[t] = topic_counts.get(t, 0) + 1
        correct_answer = q.get("answer")
        if correct_answer is None:
            # some frontend test data uses `correctIndex` and `options` — handle that
            if isinstance(q.get("correctIndex"), int) and isinstance(q.get("options"), list):
                idx = q.get("correctIndex")
                if 0 <= idx < len(q.get("options", [])):
                    correct_answer = q["options"][idx]
        if a is not None and correct_answer is not None:
            try:
                if str(a).strip().lower() == str(correct_answer).strip().lower():
                    topic_correct[t] = topic_correct.get(t, 0) + 1
            except Exception:
                # non-string comparisons fallback to equality
                if a == correct_answer:
                    topic_correct[t] = topic_correct.get(t, 0) + 1

    topic_scores = {
        t: round((topic_correct.get(t, 0) / c) * 100, 2) if c else 0.0 for t, c in topic_counts.items()
    }

    # Classify topics based on score thresholds
    strengths = [t for t, s in topic_scores.items() if s >= 75]
    weaknesses = [t for t, s in topic_scores.items() if s < 60]
    review_topics = [t for t, s in topic_scores.items() if 60 <= s < 75]

    # Confidence score — blend overall score and mean topic score
    mean_topic_score = round(sum(topic_scores.values()) / len(topic_scores), 2) if topic_scores else score
    confidence_score = int(round((score * 0.6) + (mean_topic_score * 0.4)))

    # Recommended learning mode heuristic
    if confidence_score < 60:
        recommended_learning_mode = "Practice"
    elif confidence_score < 80:
        recommended_learning_mode = "Study"
    else:
        recommended_learning_mode = "Project"

    # Recommended start topic: first weakness, else first review, else topic with lowest score
    if weaknesses:
        recommended_start_topic = weaknesses[0]
    elif review_topics:
        recommended_start_topic = review_topics[0]
    elif topic_scores:
        recommended_start_topic = min(topic_scores.items(), key=lambda kv: kv[1])[0]
    else:
        recommended_start_topic = topic

    # Reasoning summary
    reasoning_parts: List[str] = []
    if strengths:
        reasoning_parts.append(f"Per-topic strengths: {', '.join(strengths)}")
    if weaknesses:
        reasoning_parts.append(f"Weak areas: {', '.join(weaknesses)}")
    if review_topics:
        reasoning_parts.append(f"Topics to review: {', '.join(review_topics)}")
    if not reasoning_parts:
        reasoning_parts.append("Analysis based on available answers and score.")

    reasoning = ". ".join(reasoning_parts)

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "review_topics": review_topics,
        "confidence_score": confidence_score,
        "recommended_learning_mode": recommended_learning_mode,
        "recommended_start_topic": recommended_start_topic,
        "reasoning": reasoning,
    }
