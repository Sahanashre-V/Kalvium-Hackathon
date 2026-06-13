from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.schemas.learning import (
    AnalysisResponse,
    AssessmentGenerateRequest,
    AssessmentGenerateResponse,
    AssessmentSubmitRequest,
    DashboardResponse,
    LessonResponse,
    QuizGenerateRequest,
    QuizGenerateResponse,
    QuizSubmitRequest,
    QuizSubmitResponse,
    RoadmapGenerateRequest,
    RoadmapGenerateResponse,
    ScoreResponse,
    TopicSelectRequest,
    TopicSelectResponse,
)
from app.services.learning_flow import LearningFlowError, LearningFlowService
from app.dependencies import get_current_user
from app.models import User


router = APIRouter(tags=["learning-flow"])
service = LearningFlowService()


def _handle_error(error: LearningFlowError) -> None:
    raise HTTPException(status_code=error.status_code, detail={"status": "error", "message": error.detail})


@router.post("/topic/select", response_model=TopicSelectResponse)
def select_topic(payload: TopicSelectRequest, db: DbSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        payload.user_id = current_user.id
        return service.select_topic(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.post("/assessment/generate", response_model=AssessmentGenerateResponse)
def generate_assessment(payload: AssessmentGenerateRequest, db: DbSession = Depends(get_db)):
    try:
        return service.generate_assessment(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.post("/assessment/submit", response_model=ScoreResponse)
def submit_assessment(payload: AssessmentSubmitRequest, db: DbSession = Depends(get_db)):
    try:
        return service.submit_assessment(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.get("/analysis/{session_id}", response_model=AnalysisResponse)
def get_analysis(session_id: int, db: DbSession = Depends(get_db)):
    try:
        return service.get_analysis(db, session_id)
    except LearningFlowError as error:
        _handle_error(error)


@router.post("/roadmap/generate", response_model=RoadmapGenerateResponse)
def generate_roadmap(payload: RoadmapGenerateRequest, db: DbSession = Depends(get_db)):
    try:
        return service.generate_roadmap(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.get("/lesson/{topic}", response_model=LessonResponse)
def get_lesson(topic: str, session_id: int | None = None, db: DbSession = Depends(get_db)):
    try:
        return service.get_lesson(db, topic, session_id)
    except LearningFlowError as error:
        _handle_error(error)


@router.post("/quiz/generate", response_model=QuizGenerateResponse)
def generate_quiz(payload: QuizGenerateRequest, db: DbSession = Depends(get_db)):
    try:
        return service.generate_quiz(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.post("/quiz/submit", response_model=QuizSubmitResponse)
def submit_quiz(payload: QuizSubmitRequest, db: DbSession = Depends(get_db)):
    try:
        return service.submit_quiz(db, payload)
    except LearningFlowError as error:
        _handle_error(error)


@router.get("/dashboard/{session_id}", response_model=DashboardResponse)
def get_dashboard(session_id: int, db: DbSession = Depends(get_db)):
    try:
        return service.get_dashboard(db, session_id)
    except LearningFlowError as error:
        _handle_error(error)
