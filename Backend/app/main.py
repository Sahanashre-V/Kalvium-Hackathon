from fastapi import FastAPI

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


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kalvium Hackathon Backend",
    version="0.1.0",
)


@app.get("/")
def root():
    return {"message": "Kalvium Hackathon API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(users_router, prefix="/api")
app.include_router(learning_router, prefix="/api")
app.include_router(sessions_router, prefix="/api")
app.include_router(assessments_router, prefix="/api")
app.include_router(analyses_router, prefix="/api")
app.include_router(roadmaps_router, prefix="/api")
app.include_router(lessons_router, prefix="/api")
app.include_router(quizzes_router, prefix="/api")
app.include_router(progress_router, prefix="/api")
