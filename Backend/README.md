# Kalvium Hackathon Backend

FastAPI backend using SQLAlchemy, SQLite, and Pydantic.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload
```

API docs will be available at:

```text
http://127.0.0.1:8000/docs
```

## Learning Flow APIs

All responses include a stable `status` field and predictable ids for frontend use.

```text
POST /api/topic/select
POST /api/assessment/generate
POST /api/assessment/submit
GET  /api/analysis/{session_id}
POST /api/roadmap/generate
GET  /api/lesson/{topic}?session_id={session_id}
POST /api/quiz/generate
POST /api/quiz/submit
GET  /api/dashboard/{session_id}
```

Supported mock learning domains:

```text
DSA, React, ML
```
