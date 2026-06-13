from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.schemas.base import ORMModel


class QuizBase(BaseModel):
    lesson_id: int
    title: str
    questions_json: list[dict[str, Any]]
    answers_json: dict[str, Any] | None = None
    score: float | None = None


class QuizCreate(QuizBase):
    pass


class QuizRead(QuizBase, ORMModel):
    id: int
    created_at: datetime
