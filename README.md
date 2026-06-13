# LearnAnything AI

### Personalized AI Learning Companion

## Overview

LearnAnything AI is an adaptive learning platform that helps users learn any topic through personalized roadmaps, AI-generated lessons, interactive assessments, and progress tracking.

Unlike traditional AI chatbots that provide generic explanations, LearnAnything AI first identifies a learner's current knowledge level, discovers knowledge gaps, and then creates a customized learning path.

The goal is to make learning structured, measurable, and personalized.

---

## Problem Statement

Most learning platforms and AI tutors:

* Provide the same learning path for everyone
* Do not understand what a learner already knows
* Focus on content delivery rather than mastery
* Lack personalized assessments and progress tracking

This often leads to inefficient learning and knowledge gaps.

---

## Our Solution

LearnAnything AI acts as an intelligent learning companion that:

1. Assesses a learner's current knowledge
2. Identifies strengths and weaknesses
3. Generates a personalized roadmap
4. Teaches concepts step-by-step
5. Creates quizzes and challenges
6. Tracks learning progress over time

---

## Core Features

### Knowledge Assessment

Users enter a topic they want to learn.

Example:

* React
* DSA
* Machine Learning
* System Design

The platform generates assessment questions to evaluate existing knowledge.

Output:

* Strength areas
* Weak areas
* Learning readiness score

---

### Personalized Learning Roadmap

Based on assessment results, the system generates a custom roadmap.

Example:

React
├── Components ✓
├── Props ✓
├── State ⚠
├── Hooks ❌
└── Context API ❌

---

### AI-Powered Teaching

For every concept:

* Beginner-friendly explanation
* Real-world examples
* Visual learning support
* Step-by-step progression

---

### Quiz Generation

The platform automatically generates:

* MCQs
* Conceptual questions
* Application-based questions

Users receive immediate feedback.

---

### Progress Tracking

The system records:

* Topics completed
* Quiz performance
* Learning streaks
* Mastery levels

---

### Notes-Based Testing

Users can upload:

* PDF Notes
* Study Material
* Documentation

The system generates topic-specific quizzes from uploaded content.

---

## System Architecture

┌─────────────────────────┐
│ Frontend (React)        │
└────────────┬────────────┘
│
▼
┌─────────────────────────┐
│ FastAPI Backend         │
└────────────┬────────────┘
│
┌───────────┼────────────┐
▼           ▼            ▼

LLM      PostgreSQL     Vector DB
Service   Database      (ChromaDB)

▼           ▼            ▼

Roadmaps   User Data    Notes Search
Lessons    Progress     Retrieval
Quizzes

---

## Technology Stack

### Frontend

* React
* Tailwind CSS
* Framer Motion

### Backend

* FastAPI
* Python

### AI Layer

* Gemini API / OpenAI API

### Database

* PostgreSQL

### Vector Database

* ChromaDB

### Document Processing

* LangChain
* PyPDF

---

## High Level Workflow

1. User enters a topic.
2. AI generates assessment questions.
3. User answers questions.
4. AI evaluates knowledge level.
5. Personalized roadmap is generated.
6. User learns concepts.
7. Quizzes validate understanding.
8. Progress is tracked and updated.

---

## Project Structure

frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── utils/

backend/
├── app/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── database/
│   ├── prompts/
│   └── utils/

docs/
README.md

---

## Environment Variables

Create a .env file in the backend directory.

```env
OPENAI_API_KEY=your_api_key

DATABASE_URL=postgresql://user:password@localhost/db

CHROMA_DB_PATH=./chroma
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd learnanything-ai
```

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```bash
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

## Future Scope

* Adaptive learning profiles
* Learning analytics dashboard
* Spaced repetition
* Knowledge graph visualization
* AI-generated mini projects
* Peer learning recommendations

---

## Contributors

Built during the Age of AGI Hackathon.

We welcome suggestions, feedback, and contributions.

---

## License

MIT License
