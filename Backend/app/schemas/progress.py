from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.base import ORMModel


class ProgressBase(BaseModel):
    user_id: int
    session_id: int
    lesson_id: int | None = None
    status: str = "not_started"
    completion_percent: float = Field(default=0.0, ge=0.0, le=100.0)
    score: float | None = None


class ProgressCreate(ProgressBase):
    pass


class ProgressRead(ProgressBase, ORMModel):
    id: int
    updated_at: datetime
