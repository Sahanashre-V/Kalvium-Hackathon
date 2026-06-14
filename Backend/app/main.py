from fastapi import FastAPI
import os

from app import models
from app.database import Base, engine
from app.routes import (
    analyses_router,
    assessments_router,
    learning_router,
    lessons_router,
    progress_router,
    quizzes_router,
    roadmaps_router,
    sessions_router,
    users_router,
)
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kalvium Hackathon Backend",
    version="0.1.0",
)

# Allow frontend dev server origins
app.add_middleware(
    CORSMiddleware,
    # `ALLOWED_ORIGINS` env var may be a comma-separated list or "*" to allow all.
    # Example: ALLOWED_ORIGINS=https://your-frontend.netlify.app,https://app.example.com
    allow_origins=(lambda: (
        ["*"] if os.getenv("ALLOWED_ORIGINS", "").strip() == "*"
        else [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000").split(",") if o.strip()]
    ))(),
    # When allow_origins is wildcard, disallow credentials to avoid browser restrictions.
    allow_credentials=(False if os.getenv("ALLOWED_ORIGINS", "").strip() == "*" else True),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Kalvium Hackathon API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(users_router, prefix="/api")
app.include_router(learning_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(sessions_router, prefix="/api")
app.include_router(assessments_router, prefix="/api")
app.include_router(analyses_router, prefix="/api")
app.include_router(roadmaps_router, prefix="/api")
app.include_router(lessons_router, prefix="/api")
app.include_router(quizzes_router, prefix="/api")
app.include_router(progress_router, prefix="/api")
