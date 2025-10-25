# Decision Architecture: KiteOps

## Executive Summary

This document outlines the architecture for the KiteOps project. The architecture is a modern, decoupled web application with a Next.js frontend and a FastAPI (Python) backend. This approach was chosen to leverage the strengths of both frameworks: Next.js for a high-performance, server-rendered React frontend, and FastAPI for a high-performance Python backend, which is ideal for the planned AI and data-intensive features. The architecture is designed to be robust, scalable, and maintainable.

## Project Initialization

The project will be set up as a monorepo to manage the frontend and backend codebases together.

```bash
# 1. Create the project directory
mkdir kiteops && cd kiteops

# 2. Initialize the Next.js frontend
npx create-next-app@latest frontend --typescript --tailwind --eslint

# 3. Set up the FastAPI backend
mkdir backend && cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn[standard] python-dotenv supabase
```

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
|---|---|---|---|---|
| **Frontend Framework** | Next.js | v14+ | 1, 2, 3 | For a high-performance, server-rendered React frontend. |
| **Backend Framework** | FastAPI (Python) | v0.100+ | 1, 2, 3 | For a high-performance Python backend, ideal for AI and data-intensive features. |
| **API Pattern** | RESTful API | OpenAPI 3.0 | 1, 2, 3 | A well-understood standard for communication between the frontend and backend. |
| **Data Persistence** | Supabase (PostgreSQL) | Client v2.76.1 | 1, 2, 3 | Provides a robust relational database, authentication, and real-time capabilities. |
| **Authentication** | Supabase Auth | Client v2.76.1 | 1 | Seamlessly integrates with the Supabase database. |
| **Real-time Solution** | Supabase Realtime | Client v2.76.1 | 2, 3 | Built into Supabase for easy implementation of real-time features. |
| **Deployment Target** | Vercel | N/A | 1, 2, 3 | The optimal platform for deploying Next.js applications and FastAPI serverless functions. |

## Project Structure (Monorepo)

```
kiteops/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   └── ...
└── backend/
    ├── app/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── routers/
    │   └── services/
    ├── tests/
    └── requirements.txt
```

## Data Architecture

Data models will be defined using Supabase's PostgreSQL database.

- **`profiles`**
  - `id` (uuid, primary key, foreign key to `auth.users.id`)
  - `email` (text, unique)
  - `full_name` (text)
  - `role` (enum: `customer`, `instructor`, `manager`)

- **`lessons`**
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `skill_level` (enum: `beginner`, `intermediate`, `advanced`)

- **`bookings`**
  - `id` (uuid, primary key)
  - `lesson_id` (uuid, foreign key to `lessons.id`)
  - `customer_id` (uuid, foreign key to `profiles.id`)
  - `instructor_id` (uuid, foreign key to `profiles.id`)
  - `start_time` (timestamp with time zone)
  - `end_time` (timestamp with time zone)
  - `status` (enum: `confirmed`, `cancelled`, `completed`)

- **`availability`**
  - `id` (uuid, primary key)
  - `instructor_id` (uuid, foreign key to `profiles.id`)
  - `start_time` (timestamp with time zone)
  - `end_time` (timestamp with time zone)

## Intelligent Scheduling Engine

The core of the intelligent scheduling engine will be implemented in the FastAPI backend. It will use a weighted decision model to suggest the optimal instructor for a given lesson booking.

**Parameters:**
- **Skill Match (50% weight):** Matches the student's skill level with the instructor's expertise.
- **Weather Suitability (30% weight):** Considers `min_wind_speed`, `max_wind_speed`, `preferred_directions`, and `allow_precipitation` from an external weather API (OpenWeatherMap). The weight of this parameter is dynamic and decreases for bookings further in the future.
- **Instructor Load Balancing (20% weight):** Considers the instructor's current workload to ensure an even distribution of lessons.

## API Contracts (RESTful API)

The API will be defined using FastAPI, which automatically generates OpenAPI 3.0 documentation.

**Example Endpoints:**
- `POST /api/bookings`: Create a new booking.
- `GET /api/lessons`: Get a list of available lessons.
- `GET /api/users/me`: Get the profile of the currently authenticated user.

## External API Integrations

- **OpenWeatherMap API:** To get real-time weather forecasts for the scheduling engine.
- **SendGrid API:** For sending transactional emails (e.g., booking confirmations).

## Development Environment

### Prerequisites

- Node.js (v18 or later)
- Python (v3.9 or later)
- npm or yarn
- pip
- A Supabase project

### Environment Variables

Create a `.env` file in the `backend` directory and a `.env.local` file in the `frontend` directory.

```
# backend/.env
SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_KEY="your-supabase-service-key"
OPENWEATHERMAP_API_KEY="your-openweathermap-api-key"
SENDGRID_API_KEY="your-sendgrid-api-key"

# frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```