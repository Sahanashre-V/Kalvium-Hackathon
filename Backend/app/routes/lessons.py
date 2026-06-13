from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Lesson
from app.schemas import LessonCreate, LessonRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/lessons", tags=["lessons"])
service = CRUDService[Lesson, LessonCreate](Lesson)


@router.get("/", response_model=list[LessonRead])
def list_lessons(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=LessonRead, status_code=status.HTTP_201_CREATED)
def create_lesson(payload: LessonCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{lesson_id}", response_model=LessonRead)
def get_lesson(lesson_id: int, db: DbSession = Depends(get_db)):
    lesson = service.get(db, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson
