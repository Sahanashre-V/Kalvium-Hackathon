from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from app.schemas.base import ORMModel


class LessonBase(BaseModel):
    roadmap_id: int
    title: str
    topic: str
    content: str
    resources_json: list[dict[str, Any]] = Field(default_factory=list)
    order_index: int = 0


class LessonCreate(LessonBase):
    pass


class LessonRead(LessonBase, ORMModel):
    id: int
    created_at: datetime
