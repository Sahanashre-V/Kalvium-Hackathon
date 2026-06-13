from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Progress(Base):
    __tablename__ = "progress"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("sessions.id"), nullable=False, index=True)
    lesson_id: Mapped[int | None] = mapped_column(ForeignKey("lessons.id"), nullable=True, index=True)
    status: Mapped[str] = mapped_column(String(50), default="not_started")
    completion_percent: Mapped[float] = mapped_column(Float, default=0.0)
    score: Mapped[float | None] = mapped_column(Float, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user = relationship("User", back_populates="progress_items")
    session = relationship("Session", back_populates="progress_items")
    lesson = relationship("Lesson", back_populates="progress_items")
