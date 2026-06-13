from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, Float, ForeignKey, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("sessions.id"), nullable=False, index=True)
    assessment_id: Mapped[int | None] = mapped_column(ForeignKey("assessments.id"), nullable=True)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    strengths_json: Mapped[list[str]] = mapped_column(JSON, default=list)
    weaknesses_json: Mapped[list[str]] = mapped_column(JSON, default=list)
    recommendations_json: Mapped[list[dict[str, Any]]] = mapped_column(JSON, default=list)
    score: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    session = relationship("Session", back_populates="analyses")
    assessment = relationship("Assessment", back_populates="analyses")
