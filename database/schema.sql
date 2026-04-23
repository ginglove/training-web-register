CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  specialization VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  course_id UUID PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  level VARCHAR(30) NOT NULL,
  duration_weeks INTEGER NOT NULL,
  owner_teacher_id UUID REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
  enrollment_id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules (
  module_id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  learning_goal TEXT NOT NULL,
  sequence_no INTEGER NOT NULL
);

CREATE TABLE labs (
  lab_id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  lab_type VARCHAR(40) NOT NULL,
  objective TEXT NOT NULL,
  due_at TIMESTAMP,
  score_weight NUMERIC(5, 2) DEFAULT 0
);

CREATE TABLE test_cases (
  test_case_id UUID PRIMARY KEY,
  lab_id UUID NOT NULL REFERENCES labs(lab_id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  preconditions TEXT,
  test_steps TEXT NOT NULL,
  expected_result TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'Medium'
);

CREATE TABLE submissions (
  submission_id UUID PRIMARY KEY,
  lab_id UUID NOT NULL REFERENCES labs(lab_id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  artifact_url TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending',
  score NUMERIC(4, 2),
  instructor_feedback TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
  announcement_id UUID PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES users(user_id),
  title VARCHAR(180) NOT NULL,
  body TEXT NOT NULL,
  audience VARCHAR(120) NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
