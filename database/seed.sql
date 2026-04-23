INSERT INTO users (user_id, full_name, email, password_hash, role, specialization) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Dr. Nguyen Minh', 'teacher@testinglab.edu', 'demo-hash', 'teacher', 'Manual testing'),
  ('22222222-2222-2222-2222-222222222222', 'Tran Hoang An', 'student1@testinglab.edu', 'demo-hash', 'student', 'Web regression'),
  ('33333333-3333-3333-3333-333333333333', 'Le Bao Chau', 'student2@testinglab.edu', 'demo-hash', 'student', 'Test automation');

INSERT INTO courses (course_id, title, description, level, duration_weeks, owner_teacher_id) VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Software Testing Foundations', 'Core theory and software quality workflow.', 'Core', 8, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Web Application Test Design', 'Practical scenario derivation and defect reporting.', 'Intermediate', 6, '11111111-1111-1111-1111-111111111111');

INSERT INTO enrollments (enrollment_id, course_id, student_id, progress_percent) VALUES
  ('44444444-4444-4444-4444-444444444441', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '22222222-2222-2222-2222-222222222222', 76),
  ('44444444-4444-4444-4444-444444444442', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '33333333-3333-3333-3333-333333333333', 54);

INSERT INTO modules (module_id, course_id, title, learning_goal, sequence_no) VALUES
  ('55555555-5555-5555-5555-555555555551', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Testing principles', 'Understand static vs dynamic testing and quality cost.', 1),
  ('55555555-5555-5555-5555-555555555552', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Boundary value analysis', 'Generate test conditions and input partitions.', 1);

INSERT INTO labs (lab_id, course_id, title, lab_type, objective, due_at, score_weight) VALUES
  ('66666666-6666-6666-6666-666666666661', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'UI Test Case Design Lab', 'Manual testing', 'Create positive, negative, and usability cases for the student portal.', '2026-04-28 23:59:00', 20),
  ('66666666-6666-6666-6666-666666666662', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'REST API Validation Sprint', 'API testing', 'Validate auth and error-path behaviors.', '2026-05-03 23:59:00', 25);

INSERT INTO test_cases (test_case_id, lab_id, title, preconditions, test_steps, expected_result, priority) VALUES
  ('77777777-7777-7777-7777-777777777771', '66666666-6666-6666-6666-666666666661', 'Valid login flow', 'Student account exists', 'Open login page, submit valid credentials', 'Dashboard is displayed successfully', 'High'),
  ('77777777-7777-7777-7777-777777777772', '66666666-6666-6666-6666-666666666662', 'Unauthorized request', 'No auth token', 'Call GET /api/courses without token', 'API returns unauthorized response', 'High');

INSERT INTO submissions (submission_id, lab_id, student_id, artifact_url, status, score, instructor_feedback) VALUES
  ('88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666661', '22222222-2222-2222-2222-222222222222', 'https://example.test/submissions/ui-lab', 'Reviewed', 8.8, 'Good coverage, add browser compatibility evidence.'),
  ('88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666662', '33333333-3333-3333-3333-333333333333', 'https://example.test/submissions/api-lab', 'Pending', NULL, 'Waiting for teacher review.');

INSERT INTO announcements (announcement_id, author_id, title, body, audience) VALUES
  ('99999999-9999-9999-9999-999999999991', '11111111-1111-1111-1111-111111111111', 'Midterm practical lab opens on Friday', 'Complete the browser compatibility checklist before the timed lab.', 'All students'),
  ('99999999-9999-9999-9999-999999999992', '11111111-1111-1111-1111-111111111111', 'New bug report template uploaded', 'Use the updated severity and reproducibility sections in your reports.', 'Team 03 and Team 04');
