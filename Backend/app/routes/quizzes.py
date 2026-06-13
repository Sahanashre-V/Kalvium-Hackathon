from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Quiz
from app.schemas import QuizCreate, QuizRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/quizzes", tags=["quizzes"])
service = CRUDService[Quiz, QuizCreate](Quiz)


@router.get("/", response_model=list[QuizRead])
def list_quizzes(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=QuizRead, status_code=status.HTTP_201_CREATED)
def create_quiz(payload: QuizCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{quiz_id}", response_model=QuizRead)
def get_quiz(quiz_id: int, db: DbSession = Depends(get_db)):
    quiz = service.get(db, quiz_id)
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz
