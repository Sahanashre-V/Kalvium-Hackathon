from typing import Any

from pydantic import BaseModel, Field


class TopicSelectRequest(BaseModel):
    topic: str
    user_id: int | None = None
    goal: str | None = None


class TopicSelectResponse(BaseModel):
    status: str
    message: str
    session_id: int
    topic: str
    normalized_topic: str
    available_topics: list[str]
    # Optional pre-assessment returned when a session is created
    assessment_id: int | None = None
    total_questions: int | None = None
    questions: list[dict[str, Any]] | None = None


class AssessmentGenerateRequest(BaseModel):
    session_id: int


class AssessmentGenerateResponse(BaseModel):
    status: str
    session_id: int
    assessment_id: int
    topic: str
    total_questions: int
    questions: list[dict[str, Any]]


class AssessmentSubmitRequest(BaseModel):
    session_id: int
    assessment_id: int
    answers: dict[str, str] = Field(default_factory=dict)


class ScoreResponse(BaseModel):
    status: str
    session_id: int
    score: float
    total_questions: int
    correct_count: int
    strong_topics: list[str]
    weak_topics: list[str]
    topic_scores: dict[str, float]
    message: str


class RoadmapGenerateRequest(BaseModel):
    session_id: int


class RoadmapGenerateResponse(BaseModel):
    status: str
    session_id: int
    roadmap_id: int
    topic: str
    ordered_topics: list[dict[str, Any]]
    skipped_topics: list[str]
    next_topic: str | None


class QuizGenerateRequest(BaseModel):
    session_id: int
    topic: str | None = None


class QuizGenerateResponse(BaseModel):
    status: str
    session_id: int
    quiz_id: int
    topic: str
    total_questions: int
    questions: list[dict[str, Any]]


class QuizSubmitRequest(BaseModel):
    session_id: int
    quiz_id: int
    answers: dict[str, str] = Field(default_factory=dict)


class QuizSubmitResponse(ScoreResponse):
    quiz_id: int
    weak_areas: list[str]


class AnalysisResponse(BaseModel):
    status: str
    session_id: int
    topic: str
    strong_topics: list[str]
    weak_topics: list[str]
    neutral_topics: list[str]
    topic_scores: dict[str, float]
    summary: str
    recommendations: list[dict[str, Any]]


class LessonResponse(BaseModel):
    status: str
    session_id: int | None
    topic: str
    domain_topic: str
    explanation: str
    examples: list[str]
    key_points: list[str]


class DashboardResponse(BaseModel):
    status: str
    session_id: int
    topic: str
    progress: dict[str, Any]
    next_topic: str | None
    strong_topics: list[str]
    weak_topics: list[str]
