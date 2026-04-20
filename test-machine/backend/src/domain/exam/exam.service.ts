import { v4 as uuidv4 } from 'uuid'
import { queryOneSql, querySql, runSql } from '../../infrastructure/database/connection.js'
import { getQuestion, listQuestions } from '../question/question.service.js'
import { ExamAnswer, ExamAnswerDto, ExamSession, ExamSessionDto, QuestionDto } from '../types.js'

// ── helpers ──────────────────────────────────────────────────────────────────

function sessionToDto(s: ExamSession): ExamSessionDto {
  return {
    id: s.id,
    userId: s.userId,
    technologyId: s.technologyId,
    level: s.level,
    questionIds: JSON.parse(s.questionIds) as string[],
    startedAt: s.startedAt,
    submittedAt: s.submittedAt,
    score: s.score,
    breakdown: s.breakdown ? JSON.parse(s.breakdown) : null
  }
}

function answerToDto(a: ExamAnswer): ExamAnswerDto {
  return {
    id: a.id,
    sessionId: a.sessionId,
    questionId: a.questionId,
    userAnswer: a.userAnswer,
    isCorrect: a.isCorrect === 1,
    timeSpent: a.timeSpent
  }
}

/** Seeded deterministic shuffle (Fisher-Yates with LCG seed) — for reproducible battle tests */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── generate ─────────────────────────────────────────────────────────────────

export interface GenerateInput {
  userId: string
  technologyId?: string
  technologyIds?: string[]
  level: string
  count?: number
  seed?: number   // deterministic mode for tests
}

export function generateExam(input: GenerateInput): ExamSessionDto {
  // Support selecting from a single technology or multiple technologies
  const techIds: string[] = input.technologyIds && input.technologyIds.length > 0
    ? input.technologyIds
    : input.technologyId
      ? [input.technologyId]
      : []

  if (techIds.length === 0) {
    throw Object.assign(new Error('No technology specified'), { status: 400 })
  }

  // Collect questions from all requested technologies (matching level)
  const collected: Record<string, QuestionDto> = {}
  for (const tid of techIds) {
    const qs = listQuestions({ technologyId: tid, level: input.level })
    for (const q of qs) collected[q.id] = q
  }

  const allQuestions = Object.values(collected)
  if (allQuestions.length === 0) {
    throw Object.assign(
      new Error(`No questions found for technologies ${techIds.join(', ')} level ${input.level}`),
      { status: 422 }
    )
  }

  const count = Math.min(input.count ?? 20, allQuestions.length)
  const shuffled = input.seed !== undefined
    ? seededShuffle(allQuestions, input.seed)
    : allQuestions.sort(() => Math.random() - 0.5)

  const selected = shuffled.slice(0, count)
  const id = uuidv4()
  const now = new Date().toISOString()

  // Shuffle MCQ options for each question using session ID as seed
  const seedNum = Math.abs(id.split('').reduce((a: number, c: string) => (a << 5) - a + c.charCodeAt(0), 0))
  const selectedWithShuffledOptions = selected.map((q, idx) => ({
    ...q,
    ...(shuffleQuestionOptions(q, seedNum + idx))
  }))

  // Store shuffled questions
  for (let i = 0; i < selectedWithShuffledOptions.length; i++) {
    const q = selectedWithShuffledOptions[i]
    if (q.type === 'mcq' && q.options) {
      // Update this question's options and answer in DB for this session
      // Since we can't easily track per-session question variants, we'll shuffle on client side
    }
  }

  runSql(
    `INSERT INTO exam_sessions (id, userId, technologyId, level, questionIds, startedAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    // Store the first technologyId for compatibility (when multiple techs were requested)
    [id, input.userId, techIds[0], input.level, JSON.stringify(selected.map(q => q.id)), now]
  )

  return sessionToDto(queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [id])!)
}

// ── get session ───────────────────────────────────────────────────────────────

export function getSession(id: string): ExamSessionDto | null {
  const row = queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [id])
  return row ? sessionToDto(row) : null
}

export function getUserSessions(userId: string): ExamSessionDto[] {
  return querySql<ExamSession>(
    'SELECT * FROM exam_sessions WHERE userId = ? ORDER BY startedAt DESC',
    [userId]
  ).map(sessionToDto)
}

// ── submit ────────────────────────────────────────────────────────────────────

export interface SubmitInput {
  answers: { questionId: string; userAnswer: string; timeSpent?: number }[]
}

export interface ExamResult {
  session: ExamSessionDto
  answers: ExamAnswerDto[]
  questions: QuestionDto[]
  score: number
  totalQuestions: number
  correctAnswers: number
  breakdown: Record<string, { correct: number; total: number }>
}

export function submitExam(sessionId: string, userId: string, input: SubmitInput): ExamResult {
  const session = queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [sessionId])
  if (!session) throw Object.assign(new Error('Exam session not found'), { status: 404 })
  if (session.userId !== userId) throw Object.assign(new Error('Forbidden'), { status: 403 })
  if (session.submittedAt) throw Object.assign(new Error('Exam already submitted'), { status: 409 })

  const questionIds: string[] = JSON.parse(session.questionIds)
  let correct = 0
  const breakdown: Record<string, { correct: number; total: number }> = {}
  const answerDtos: ExamAnswerDto[] = []
  const questions: QuestionDto[] = []

  for (const qId of questionIds) {
    const question = getQuestion(qId)
    if (!question) continue
    questions.push(question)

    const submitted = input.answers.find(a => a.questionId === qId)
    const userAnswer = submitted?.userAnswer ?? ''
    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(question.answer)
    if (isCorrect) correct++

    const topic = question.topic
    if (!breakdown[topic]) breakdown[topic] = { correct: 0, total: 0 }
    breakdown[topic].total++
    if (isCorrect) breakdown[topic].correct++

    const aid = uuidv4()
    runSql(
      `INSERT INTO exam_answers (id, sessionId, questionId, userAnswer, isCorrect, timeSpent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [aid, sessionId, qId, userAnswer, isCorrect ? 1 : 0, submitted?.timeSpent ?? 0]
    )
    answerDtos.push({ id: aid, sessionId, questionId: qId, userAnswer, isCorrect, timeSpent: submitted?.timeSpent ?? 0 })
  }

  const score = questionIds.length > 0 ? Math.round((correct / questionIds.length) * 100) : 0
  const now = new Date().toISOString()

  runSql(
    `UPDATE exam_sessions SET submittedAt = ?, score = ?, breakdown = ? WHERE id = ?`,
    [now, score, JSON.stringify(breakdown), sessionId]
  )

  const updatedSession = sessionToDto(
    queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [sessionId])!
  )

  return {
    session: updatedSession,
    answers: answerDtos,
    questions,
    score,
    totalQuestions: questionIds.length,
    correctAnswers: correct,
    breakdown
  }
}

export function getResults(sessionId: string, userId: string): ExamResult {
  const session = queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [sessionId])
  if (!session) throw Object.assign(new Error('Exam session not found'), { status: 404 })
  if (session.userId !== userId) throw Object.assign(new Error('Forbidden'), { status: 403 })
  if (!session.submittedAt) throw Object.assign(new Error('Exam not yet submitted'), { status: 422 })

  const answers = querySql<ExamAnswer>(
    'SELECT * FROM exam_answers WHERE sessionId = ?', [sessionId]
  ).map(answerToDto)

  const questionIds: string[] = JSON.parse(session.questionIds)
  const questions: QuestionDto[] = questionIds
    .map(id => getQuestion(id))
    .filter((q): q is QuestionDto => q !== null)

  const correct = answers.filter(a => a.isCorrect).length

  return {
    session: sessionToDto(session),
    answers,
    questions,
    score: session.score ?? 0,
    totalQuestions: questionIds.length,
    correctAnswers: correct,
    breakdown: session.breakdown ? JSON.parse(session.breakdown) : {}
  }
}

// ── retake with failed questions ────────────────────────────────────────────

export function generateRetakeExam(previousSessionId: string, userId: string): ExamSessionDto {
  const previousSession = queryOneSql<ExamSession>(
    'SELECT * FROM exam_sessions WHERE id = ?',
    [previousSessionId]
  )
  if (!previousSession) {
    throw Object.assign(new Error('Previous exam session not found'), { status: 404 })
  }
  if (previousSession.userId !== userId) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  if (!previousSession.submittedAt) {
    throw Object.assign(new Error('Previous exam not yet submitted'), { status: 422 })
  }

  // Get all answers from the previous session
  const previousAnswers = querySql<ExamAnswer>(
    'SELECT * FROM exam_answers WHERE sessionId = ?',
    [previousSessionId]
  ).map(answerToDto)

  // Get failed question IDs
  const failedQuestionIds = previousAnswers
    .filter(a => !a.isCorrect)
    .map(a => a.questionId)

  if (failedQuestionIds.length === 0) {
    throw Object.assign(new Error('No failed questions to retake'), { status: 422 })
  }

  // Create new exam session with only failed questions
  const id = uuidv4()
  const now = new Date().toISOString()

  runSql(
    `INSERT INTO exam_sessions (id, userId, technologyId, level, questionIds, startedAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, userId, previousSession.technologyId, previousSession.level, JSON.stringify(failedQuestionIds), now]
  )

  return sessionToDto(queryOneSql<ExamSession>('SELECT * FROM exam_sessions WHERE id = ?', [id])!)
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase()
}
