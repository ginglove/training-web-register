const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function generateCuid() {
  return 'c' + crypto.randomBytes(12).toString('hex').slice(0, 24);
}

async function generateSeedSQL() {
  console.log('Generating seed.sql...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const managerPassword = await bcrypt.hash('manager123', 10);
  const memberPassword = await bcrypt.hash('member123', 10);

  const adminId = generateCuid();
  const managerId = generateCuid();
  const memberId = generateCuid();

  const catSQLId = generateCuid();
  const catReactId = generateCuid();

  const q1Id = generateCuid();
  const q2Id = generateCuid();
  const q3Id = generateCuid();

  const q1Opt1Id = generateCuid();
  const q1Opt2Id = generateCuid();
  const q1Opt3Id = generateCuid();

  const q3Opt1Id = generateCuid();
  const q3Opt2Id = generateCuid();
  const q3Opt3Id = generateCuid();

  const paperId = generateCuid();
  const sessionId = generateCuid();
  const participantId = generateCuid();
  const sessionPaperId = generateCuid();
  const paperQ1Id = generateCuid();
  const paperQ2Id = generateCuid();
  const paperQ3Id = generateCuid();

  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();
  const nextWeek = new Date(Date.now() + 86400000 * 7).toISOString();

  const sql = `
-- USERS
INSERT INTO "users" ("id", "username", "email", "password_hash", "full_name", "role", "status", "created_at", "updated_at")
VALUES
('${adminId}', 'admin', 'admin@trainiq.com', '${adminPassword}', 'System Administrator', 'ADMIN', 'ACTIVE', '${now}', '${now}'),
('${managerId}', 'manager', 'manager@trainiq.com', '${managerPassword}', 'Training Manager', 'MANAGER', 'ACTIVE', '${now}', '${now}'),
('${memberId}', 'member', 'member@trainiq.com', '${memberPassword}', 'John Employee', 'MEMBER', 'ACTIVE', '${now}', '${now}');

-- QUESTION CATEGORIES
INSERT INTO "question_categories" ("id", "name", "description", "created_at")
VALUES
('${catSQLId}', 'SQL', 'Database Queries', '${now}'),
('${catReactId}', 'React', 'Frontend Framework', '${now}');

-- QUESTIONS
INSERT INTO "questions" ("id", "category_id", "content", "type", "difficulty", "created_by", "created_at", "updated_at")
VALUES
('${q1Id}', '${catSQLId}', 'What does SQL stand for?', 'MULTIPLE_CHOICE', 'EASY', '${adminId}', '${now}', '${now}'),
('${q2Id}', '${catSQLId}', 'Explain the difference between clustered and non-clustered index.', 'ESSAY', 'MEDIUM', '${adminId}', '${now}', '${now}'),
('${q3Id}', '${catReactId}', 'Which hook is used to manage state in a functional component?', 'MULTIPLE_CHOICE', 'EASY', '${adminId}', '${now}', '${now}');

-- QUESTION OPTIONS
INSERT INTO "question_options" ("id", "question_id", "content", "is_correct", "order")
VALUES
('${q1Opt1Id}', '${q1Id}', 'Strong Question Language', false, 0),
('${q1Opt2Id}', '${q1Id}', 'Structured Query Language', true, 1),
('${q1Opt3Id}', '${q1Id}', 'Structured Question Language', false, 2),
('${q3Opt1Id}', '${q3Id}', 'useEffect', false, 0),
('${q3Opt2Id}', '${q3Id}', 'useState', true, 1),
('${q3Opt3Id}', '${q3Id}', 'useContext', false, 2);

-- EXAM PAPERS
INSERT INTO "exam_papers" ("id", "name", "topic", "duration_minutes", "total_score", "created_by", "created_at", "updated_at")
VALUES
('${paperId}', 'Frontend & DB Assessment Q3', 'Fullstack Basics', 45, 10, '${managerId}', '${now}', '${now}');

-- EXAM PAPER QUESTIONS
INSERT INTO "exam_paper_questions" ("id", "exam_paper_id", "question_id", "score", "order")
VALUES
('${paperQ1Id}', '${paperId}', '${q1Id}', 2, 0),
('${paperQ2Id}', '${paperId}', '${q3Id}', 3, 1),
('${paperQ3Id}', '${paperId}', '${q2Id}', 5, 2);

-- EXAM SESSIONS
INSERT INTO "exam_sessions" ("id", "name", "code", "status", "start_date", "end_date", "created_by", "created_at", "updated_at")
VALUES
('${sessionId}', 'Q3 New Hires Assessment', 'DEMO-EXAM-25', 'ACTIVE', '${yesterday}', '${nextWeek}', '${managerId}', '${now}', '${now}');

-- SESSION EXAM PAPERS
INSERT INTO "session_exam_papers" ("id", "session_id", "exam_paper_id")
VALUES
('${sessionPaperId}', '${sessionId}', '${paperId}');

-- SESSION PARTICIPANTS
INSERT INTO "session_participants" ("id", "session_id", "user_id")
VALUES
('${participantId}', '${sessionId}', '${memberId}');
`;

  fs.writeFileSync('seed.sql', sql);
  console.log('seed.sql generated successfully.');
}

generateSeedSQL();
