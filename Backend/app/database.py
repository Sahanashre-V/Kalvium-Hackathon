import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session as DbSession, sessionmaker


DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./kalvium.db")
# Some platforms (Heroku, etc.) provide a DATABASE_URL that starts with
# "postgres://" — SQLAlchemy prefers "postgresql://". Normalize if needed.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[DbSession, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
