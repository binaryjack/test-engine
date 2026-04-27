import { getDb, persistDb } from './connection.js'

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    displayName TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'candidate',
    createdAt   TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS technologies (
    id          TEXT PRIMARY KEY,
    slug        TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    isActive    INTEGER NOT NULL DEFAULT 1,
    levels      TEXT NOT NULL DEFAULT '[]',
    createdAt   TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS questions (
    id            TEXT PRIMARY KEY,
    technologyId  TEXT NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
    level         TEXT NOT NULL,
    topic         TEXT NOT NULL,
    subtopic      TEXT NOT NULL DEFAULT '',
    type          TEXT NOT NULL DEFAULT 'mcq',
    prompt        TEXT NOT NULL,
    options       TEXT,
    answer        TEXT NOT NULL,
    difficulty    INTEGER NOT NULL DEFAULT 3,
    estimatedTime INTEGER NOT NULL DEFAULT 60,
    explanation   TEXT NOT NULL DEFAULT '',
    "references"  TEXT NOT NULL DEFAULT '[]',
    createdAt     TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_questions_tech_level ON questions (technologyId, level);
  CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions (topic);

  CREATE TABLE IF NOT EXISTS exam_sessions (
    id           TEXT PRIMARY KEY,
    userId       TEXT NOT NULL REFERENCES users(id),
    technologyId TEXT NOT NULL REFERENCES technologies(id),
    level        TEXT NOT NULL,
    questionIds  TEXT NOT NULL DEFAULT '[]',
    startedAt    TEXT NOT NULL,
    submittedAt  TEXT,
    score        REAL,
    breakdown    TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions (userId);

  CREATE TABLE IF NOT EXISTS exam_answers (
    id          TEXT PRIMARY KEY,
    sessionId   TEXT NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
    questionId  TEXT NOT NULL REFERENCES questions(id),
    userAnswer  TEXT NOT NULL DEFAULT '',
    isCorrect   INTEGER NOT NULL DEFAULT 0,
    timeSpent   INTEGER NOT NULL DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_answers_session ON exam_answers (sessionId);
`

export async function migrate(): Promise<void> {
  const db = await getDb()
  db.run(SCHEMA_SQL, [])
  persistDb()
  console.log('[migrate] Schema applied')
}

/**
 * Destructive reseed: Drops all tables and recreates them from scratch.
 */
export async function recreateDbTables(): Promise<void> {
  const db = await getDb()
  const tables = ['exam_answers', 'exam_sessions', 'questions', 'technologies', 'users']
  
  // Disable foreign keys temporarily for clean drop
  db.run('PRAGMA foreign_keys = OFF',[])
  for (const table of tables) {
    db.run(`DROP TABLE IF EXISTS ${table}`,[])
  }
  db.run('PRAGMA foreign_keys = ON',[])
  
  persistDb()
  console.log('[recreate] All tables dropped')
  await migrate() // Re-apply current schema
}
