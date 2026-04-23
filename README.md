# Software Testing Teaching System

This repository contains a full-stack starter for a web system used to teach software testing to students.  
It includes:

- A modern frontend with Flat Design and Glassmorphism
- A basic Node.js microservice backend
- PostgreSQL schema and seed data
- Documentation for the initial architecture

## Project structure

```text
frontend/                 Student + teacher dashboard UI
backend/gateway/          API gateway
backend/services/auth/    Demo identity service
backend/services/learning/Course + announcement service
backend/services/assessment/Lab + submission service
backend/services/admin/   Metrics + roadmap service
database/                 PostgreSQL schema and sample data
docs/                     Architecture notes
```

## How to run

1. Start all backend services:

```bash
npm run start:all
```

2. Open the frontend:

- Open [frontend/index.html](/Users/admin/Documents/BanHoa/frontend/index.html)
- Or serve the folder with a static server if you prefer

3. Optional database setup:

```bash
psql -f database/schema.sql
psql -f database/seed.sql
```

## API services

- Gateway: `http://localhost:4000`
- Auth service: `http://localhost:4001`
- Learning service: `http://localhost:4002`
- Assessment service: `http://localhost:4003`
- Admin service: `http://localhost:4004`

## Notes

- The backend currently uses in-memory demo data for speed of setup.
- The SQL files represent the persistent database model for the next iteration.
- The original requirement was interpreted as a software-testing classroom system with teacher, student, and admin workflows.
