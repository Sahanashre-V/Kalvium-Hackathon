# Deployment Guide — Backend

This file describes how to run the backend locally with Postgres and how to deploy to common hosts (Render / Railway / Heroku).

## Local testing (Postgres via Docker)

1. Start Postgres with Docker:

```bash
docker run --name kalvium-postgres \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=kalvium \
  -p 5432:5432 -d postgres
```

2. Create and activate your virtualenv, install requirements:

```bash
python -m venv .venv
source .venv/Scripts/activate   # bash / WSL
pip install -r requirements.txt
```

3. Set env vars and run the server (bash):

```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/kalvium"
export SECRET_KEY="change-this-secret"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

PowerShell:

```powershell
$env:DATABASE_URL = "postgresql://user:pass@localhost:5432/kalvium"
$env:SECRET_KEY = "change-this-secret"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

4. Verify: http://localhost:8000/health

## Environment variables

- `DATABASE_URL` — Postgres connection string (e.g. `postgresql://user:pass@host:5432/dbname`).
- `SECRET_KEY` — JWT / signing secret.
- `JWT_ALGORITHM` (optional, default `HS256`).
- `ACCESS_TOKEN_EXPIRE_MINUTES` (optional).

The code normalizes `postgres://` → `postgresql://` automatically.

## Deploy to Render / Railway / Heroku (summary)

- Create a new Web Service and point to the `Backend` folder.
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Provision a managed Postgres and copy its `DATABASE_URL` into the service environment.
- Add `SECRET_KEY` and other env vars in the host UI.

## Frontend

- Deploy the `Frontend` folder to Netlify or Vercel. Netlify will use `npm run build` and publish the `dist` folder. Keep `public/_redirects` for SPA routing.
- Configure frontend to point to the deployed backend base URL.

## Notes

- This project uses `Base.metadata.create_all(...)` to create tables on startup. For production DB schema changes, consider migrating to Alembic.
- If using a provider that supplies a `postgres://` URL, the code will normalize it for SQLAlchemy.
