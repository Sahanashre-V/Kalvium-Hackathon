from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from app.schemas.base import ORMModel


class RoadmapBase(BaseModel):
    session_id: int
    title: str
    description: str | None = None
    milestones_json: list[dict[str, Any]] = Field(default_factory=list)


class RoadmapCreate(RoadmapBase):
    pass


class RoadmapRead(RoadmapBase, ORMModel):
    id: int
    created_at: datetime
