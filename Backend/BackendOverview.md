# LearnAnything AI - Backend Architecture Specification

Version: 1.0

Purpose:
This document defines the complete backend architecture for LearnAnything AI.

All backend development, API design, database design, AI integration, and future enhancements must follow this document.

---

# 1. Product Overview

LearnAnything AI is an adaptive learning platform that personalizes:

1. What a student learns
2. How a student learns
3. What a student should learn next

Core Flow:

Topic Selection
→ Pre-Assessment
→ Knowledge Analysis
→ Personalized Roadmap
→ Lesson Generation
→ Adaptive Learning Modes
→ Post-Lesson Quiz
→ Progress Tracking
→ Dashboard Analytics

---

# 2. Backend Responsibilities

Backend must handle:

* User management
* Learning sessions
* AI orchestration
* Assessment generation
* Assessment evaluation
* Roadmap generation
* Lesson generation
* Quiz generation
* Video recommendation retrieval
* Progress tracking
* Dashboard analytics
* Learning mode personalization
* Recommendation engine

---

# 3. Recommended Tech Stack

Backend:
FastAPI

Database:
PostgreSQL

ORM:
SQLAlchemy

AI Layer:
Gemini API

Caching:
Redis

Vector Storage (Future):
FAISS

Background Tasks:
Celery / FastAPI Background Tasks

Deployment:
Render / Railway / AWS

---

# 4. High-Level Architecture

Frontend

↓

FastAPI Gateway

↓

Services Layer

├── Assessment Service
├── Roadmap Service
├── Lesson Service
├── Quiz Service
├── Progress Service
├── Analytics Service
├── Recommendation Service
├── Video Service

↓

Gemini

↓

PostgreSQL

↓

Redis

---

# 5. Database Design

## Users

user_id
name
email
created_at

---

## Learning Sessions

session_id
user_id
selected_topic
learning_mode
started_at
updated_at

---

## Assessments

assessment_id
session_id
topic
questions_json
answers_json
score
created_at

---

## Knowledge Analysis

analysis_id
session_id

strengths_json
review_topics_json
weak_topics_json

confidence_score

created_at

---

## Roadmaps

roadmap_id
session_id

roadmap_json

completion_percentage

created_at

---

## Lessons

lesson_id

session_id

topic

lesson_name

generated_content_json

created_at

---

## Lesson Progress

progress_id

session_id

lesson_id

completed_sections

total_sections

completion_percentage

updated_at

---

## Quiz Attempts

quiz_id

session_id

lesson_id

questions_json

answers_json

score

accuracy

difficulty_breakdown_json

created_at

---

## Dashboard Analytics

analytics_id

session_id

mastery_score

interview_readiness

learning_confidence

quiz_accuracy

roadmap_completion

updated_at

---

# 6. AI Services

## Assessment Generation Service

Input:

Topic

Example:

Machine Learning

Output:

6-8 questions

Difficulty Mix:

Easy
Medium
Hard

Metadata:

Question
Topic Mapping
Difficulty

Purpose:

Identify learner strengths and weaknesses.

---

## Assessment Evaluation Service

Input:

Questions
Answers

Output:

Strengths

Needs Review

Knowledge Gaps

Confidence Score

Example:

Strong:
Regression

Weak:
Neural Networks

Review:
Model Evaluation

---

## Roadmap Generation Service

Input:

Selected Topic
Assessment Analysis

Output:

Personalized Roadmap

Example:

Regression
Classification
Feature Engineering
Model Evaluation
Neural Networks

The roadmap must be different for different users.

---

## Lesson Generation Service

Input:

Topic
Lesson Name
Learning Mode

Output:

Structured lesson

Sections:

What is it

Why it matters

Examples

How it works

Industry usage

Key takeaways

Checkpoint

---

## Quiz Generation Service

Input:

Lesson

Output:

10-15 questions

Mix:

MCQ

Scenario

Code Analysis

Application Based

Interview Style

---

# 7. Adaptive Learning Modes

Supported Modes

Read

Watch

Practice

Revision

Mixed

---

## Read Mode

Generate detailed lesson content.

---

## Watch Mode

Generate video recommendations.

Output:

Title

Description

URL

Difficulty

Duration

---

## Practice Mode

Generate:

Mini Challenges

Checkpoint Questions

Problem Solving Tasks

---

## Revision Mode

Generate:

Quick Notes

Cheat Sheet

Common Mistakes

Summary

---

## Mixed Mode

Combine:

Read
Watch
Practice
Revision

---

# 8. Video Recommendation Service

Input:

Lesson Topic

Output:

Recommended educational videos

Metadata:

Title

Duration

Difficulty

Thumbnail

URL

Future:

Use YouTube Search API.

For Hackathon:

Static curated mapping.

---

# 9. Recommendation Engine

Purpose:

Determine:

Recommended Learning Style

Recommended Next Topic

Recommended Review Topics

Recommended Weak Areas

Inputs:

Assessment
Quiz Results
Progress

Outputs:

Recommendation JSON

---

# 10. Progress Tracking Service

Track:

Lessons Completed

Sections Completed

Videos Watched

Quiz Scores

Roadmap Completion

Learning Streak

Mode Usage

Store continuously.

---

# 11. Dashboard Analytics Service

Generate:

Topics Completed

Current Topic

Quiz Accuracy

Mastery Score

Roadmap Progress

Interview Readiness

Learning Confidence

Mode Usage Statistics

Recommended Next Topic

---

# 12. API Design

POST

/api/topic/select

Select Topic

---

POST

/api/assessment/generate

Generate Assessment

---

POST

/api/assessment/submit

Submit Assessment

---

GET

/api/analysis/{session_id}

Knowledge Analysis

---

POST

/api/roadmap/generate

Generate Roadmap

---

GET

/api/roadmap/{session_id}

Fetch Roadmap

---

POST

/api/lesson/generate

Generate Lesson

---

GET

/api/lesson/{lesson_id}

Fetch Lesson

---

POST

/api/quiz/generate

Generate Quiz

---

POST

/api/quiz/submit

Submit Quiz

---

POST

/api/progress/update

Update Progress

---

GET

/api/dashboard/{session_id}

Dashboard Data

---

GET

/api/recommendations/{session_id}

Recommendations

---

# 13. AI Prompt Layer

All AI requests must pass through dedicated prompt templates.

Never directly call Gemini from routes.

Create:

assessment_prompt.py

analysis_prompt.py

roadmap_prompt.py

lesson_prompt.py

quiz_prompt.py

recommendation_prompt.py

This keeps prompts centralized.

---

# 14. Caching Layer

Cache:

Assessments

Lessons

Roadmaps

Video Recommendations

Quiz Results

Use Redis.

Reduce Gemini costs.

Improve speed.

---

# 15. Future Enhancements

Learning Twin

Knowledge Graph

Multi-Agent Tutor

Voice Tutor

PDF Upload Learning

Notes Upload Assessment

Peer Learning

Interview Simulator

Career Roadmaps

Company-Specific Preparation

---

# 16. Hackathon MVP Priorities

Priority 1

Assessment Generation

Assessment Evaluation

Roadmap Generation

Lesson Generation

Quiz Generation

Progress Tracking

Dashboard

---

Priority 2

Video Recommendations

Adaptive Learning Modes

Recommendation Engine

---

Priority 3

Redis

Vector Search

Learning Twin

Knowledge Graph

---

# 17. Success Criteria

A user should be able to:

Select Machine Learning

↓

Take Assessment

↓

Receive Knowledge Analysis

↓

Receive Personalized Roadmap

↓

Open Regression

↓

Choose Learning Mode

↓

Learn Content

↓

Take Quiz

↓

Receive Analytics

↓

Track Progress

↓

Get Recommended Next Topic

without any hardcoded content or broken flow.

The backend must be fully AI-driven and capable of generating personalized learning experiences dynamically.