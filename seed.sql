
-- USERS
INSERT INTO "users" ("id", "username", "email", "password_hash", "full_name", "role", "status", "created_at", "updated_at")
VALUES
('c305a549ccd4117e2e9346741', 'admin', 'admin@trainiq.com', '$2a$10$JJ.P5cAZf5uZr65jePRXh.oybjRlMSw4zwAHMKgL9OWcMBoJPGUtK', 'System Administrator', 'ADMIN', 'ACTIVE', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z'),
('cf7904278471a401cc06395db', 'manager', 'manager@trainiq.com', '$2a$10$WPDCgX5hfYYm1oRkZTbNsufcaYTiFJPcutap5WG/fM98aB1fWq2mO', 'Training Manager', 'MANAGER', 'ACTIVE', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z'),
('c7353bd1f7b141cecef351a7a', 'member', 'member@trainiq.com', '$2a$10$CAxUG2t9ztW2ef9KB2JNV.fNwtGHIh9T0Gp1lisauh5b4WsrEjoXO', 'John Employee', 'MEMBER', 'ACTIVE', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z');

-- QUESTION CATEGORIES
INSERT INTO "question_categories" ("id", "name", "description", "created_at")
VALUES
('c9263b3b83b6fe86fb1259729', 'SQL', 'Database Queries', '2026-04-23T18:51:41.710Z'),
('cbb42ca4d4d021b85bbe57529', 'React', 'Frontend Framework', '2026-04-23T18:51:41.710Z');

-- QUESTIONS
INSERT INTO "questions" ("id", "category_id", "content", "type", "difficulty", "created_by", "created_at", "updated_at")
VALUES
('c53ed147898c326de9448e780', 'c9263b3b83b6fe86fb1259729', 'What does SQL stand for?', 'MULTIPLE_CHOICE', 'EASY', 'c305a549ccd4117e2e9346741', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z'),
('c4bcf060e69a852539b7323b6', 'c9263b3b83b6fe86fb1259729', 'Explain the difference between clustered and non-clustered index.', 'ESSAY', 'MEDIUM', 'c305a549ccd4117e2e9346741', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z'),
('cff897a2a25db73bc3c3d24e6', 'cbb42ca4d4d021b85bbe57529', 'Which hook is used to manage state in a functional component?', 'MULTIPLE_CHOICE', 'EASY', 'c305a549ccd4117e2e9346741', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z');

-- QUESTION OPTIONS
INSERT INTO "question_options" ("id", "question_id", "content", "is_correct", "order")
VALUES
('ccf07e6b53d41ddc23842bf3e', 'c53ed147898c326de9448e780', 'Strong Question Language', false, 0),
('c266dff863ab6958403e8cc31', 'c53ed147898c326de9448e780', 'Structured Query Language', true, 1),
('ca667fbf438b8578240018105', 'c53ed147898c326de9448e780', 'Structured Question Language', false, 2),
('cdaf1cd24204ca3ab8061b081', 'cff897a2a25db73bc3c3d24e6', 'useEffect', false, 0),
('c6f41ec7fee1ce4dfbb994671', 'cff897a2a25db73bc3c3d24e6', 'useState', true, 1),
('caaa3d68090fcd1f4f58e3e36', 'cff897a2a25db73bc3c3d24e6', 'useContext', false, 2);

-- EXAM PAPERS
INSERT INTO "exam_papers" ("id", "name", "topic", "duration_minutes", "total_score", "created_by", "created_at", "updated_at")
VALUES
('cc13e1fd6c37dbdbb988ae8b1', 'Frontend & DB Assessment Q3', 'Fullstack Basics', 45, 10, 'cf7904278471a401cc06395db', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z');

-- EXAM PAPER QUESTIONS
INSERT INTO "exam_paper_questions" ("id", "exam_paper_id", "question_id", "score", "order")
VALUES
('c414e48627286e808411e7f31', 'cc13e1fd6c37dbdbb988ae8b1', 'c53ed147898c326de9448e780', 2, 0),
('cb674fa154cc1854761f8cfa8', 'cc13e1fd6c37dbdbb988ae8b1', 'cff897a2a25db73bc3c3d24e6', 3, 1),
('cff34e429ffce60c80a0bad00', 'cc13e1fd6c37dbdbb988ae8b1', 'c4bcf060e69a852539b7323b6', 5, 2);

-- EXAM SESSIONS
INSERT INTO "exam_sessions" ("id", "name", "code", "status", "start_date", "end_date", "created_by", "created_at", "updated_at")
VALUES
('ce391e74b12cdce18e98faba1', 'Q3 New Hires Assessment', 'DEMO-VTI-EXAM-2', 'ACTIVE', '2026-04-22T18:51:41.711Z', '2026-04-30T18:51:41.711Z', 'cf7904278471a401cc06395db', '2026-04-23T18:51:41.710Z', '2026-04-23T18:51:41.710Z');

-- SESSION EXAM PAPERS
INSERT INTO "session_exam_papers" ("id", "session_id", "exam_paper_id")
VALUES
('cf2323d545b7ca4c57eca345a', 'ce391e74b12cdce18e98faba1', 'cc13e1fd6c37dbdbb988ae8b1');

-- SESSION PARTICIPANTS
INSERT INTO "session_participants" ("id", "session_id", "user_id")
VALUES
('cc1906aef05f03bcc8477f809', 'ce391e74b12cdce18e98faba1', 'c7353bd1f7b141cecef351a7a');
