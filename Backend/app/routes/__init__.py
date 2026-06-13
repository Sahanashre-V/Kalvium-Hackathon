from app.routes.analyses import router as analyses_router
from app.routes.assessments import router as assessments_router
from app.routes.lessons import router as lessons_router
from app.routes.learning import router as learning_router
from app.routes.progress import router as progress_router
from app.routes.quizzes import router as quizzes_router
from app.routes.roadmaps import router as roadmaps_router
from app.routes.sessions import router as sessions_router
from app.routes.users import router as users_router

__all__ = [
    "analyses_router",
    "assessments_router",
    "lessons_router",
    "learning_router",
    "progress_router",
    "quizzes_router",
    "roadmaps_router",
    "sessions_router",
    "users_router",
]
