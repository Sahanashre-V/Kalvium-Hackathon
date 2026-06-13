from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    topic: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    goal: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user = relationship("User", back_populates="sessions")
    assessments = relationship("Assessment", back_populates="session", cascade="all, delete-orphan")
    analyses = relationship("Analysis", back_populates="session", cascade="all, delete-orphan")
    roadmaps = relationship("Roadmap", back_populates="session", cascade="all, delete-orphan")
    progress_items = relationship("Progress", back_populates="session", cascade="all, delete-orphan")
