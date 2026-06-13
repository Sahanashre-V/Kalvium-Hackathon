from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from app.schemas.base import ORMModel


class AnalysisBase(BaseModel):
    session_id: int
    assessment_id: int | None = None
    summary: str
    strengths_json: list[str] = Field(default_factory=list)
    weaknesses_json: list[str] = Field(default_factory=list)
    recommendations_json: list[dict[str, Any]] = Field(default_factory=list)
    score: float | None = None


class AnalysisCreate(AnalysisBase):
    pass


class AnalysisRead(AnalysisBase, ORMModel):
    id: int
    created_at: datetime
