# Architecture Overview

## Product direction

This system is adapted for teaching software testing to students instead of e-commerce.
The initial scope supports:

- Role-aware access for admin, teacher, and student
- Course and module delivery
- Practical testing labs and submissions
- Announcements and classroom communication
- A lightweight admin overview for quality risks and teaching progress

## Microservice split

### `auth-service`
- Demo login and user/profile data
- Role and identity ownership

### `learning-service`
- Courses
- Modules
- Announcements

### `assessment-service`
- Labs
- Test-case oriented practice
- Submission intake and review status

### `admin-service`
- Dashboard metrics
- Risk summaries
- Delivery roadmap

### `api-gateway`
- Single frontend entry point
- Simple request forwarding to backend services

## Database direction

The SQL schema uses a single PostgreSQL database for simplicity, but it is partitioned by bounded contexts so the project can later move toward service-owned databases:

- Identity: `users`
- Teaching delivery: `courses`, `modules`, `enrollments`, `announcements`
- Assessment: `labs`, `test_cases`, `submissions`

## Suggested next iteration

1. Add real authentication with JWT and password hashing
2. Separate each microservice into its own datastore or schema
3. Add teacher CRUD screens for courses, labs, and grading
4. Add student submission upload and rubric-based grading
5. Add automated test execution examples for API and UI exercises
