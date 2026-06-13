from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.schemas.base import ORMModel


class AssessmentBase(BaseModel):
    session_id: int
    topic: str
    questions_json: list[dict[str, Any]]
    answers_json: dict[str, Any] | None = None
    score: float | None = None


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentRead(AssessmentBase, ORMModel):
    id: int
    created_at: datetime
