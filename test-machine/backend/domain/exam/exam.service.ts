
import { queryMultipleSql, runSql } from '../../infrastructure/database/connection'; // Assuming these utilities are available
import { ExamSession, Question } from '../types'
// Import other necessary types and helpers

/**
 * Generates a new exam session containing only questions that failed in the previous attempt.
 * @param userId The ID of the user performing the retake.
 * @param failedQuestionIds Array of IDs for questions that need to be included in the retake exam.
 * @returns A Promise resolving to the newly created ExamSession DTO.
 */
export async function generateRetakeExamFromIds(userId: string, failedQuestionIds: string[]): Promise<ExamSession> {
  if (failedQuestionIds.length === 0) {
    throw new Error("No failed questions provided for retake.");
  }

  // 1. Fetch all question details based on the IDs provided
  const questions = await queryMultipleSql<Question>(`SELECT * FROM questions WHERE id IN (?)`, [failedQuestionIds])
  if (!questions || questions.length === 0) {
    throw new Error("Could not find any active questions for the provided failed IDs.");
  }

  // 2. Determine global context (Technology/Level) from the first question found
  const technologyId = questions[0].technologyId;
  const level = questions[0].level;

  // 3. Create a new session record
  const sessionId = crypto.randomUUID(); // Use a UUID generator utility
  const newSession: ExamSession = {
    id: sessionId,
    userId: userId,
    technologyId: technologyId,
    level: level,
    questionIds: failedQuestionIds,
    createdAt: new Date(),
  };

  // 4. Save the new session and return it
  await runSql(
    'INSERT INTO exam_sessions (id, user_id, technology_id, level, question_ids) VALUES (?, ?, ?, ?, ?)', 
    [newSession.id, newSession.userId, newSession.technologyId, newSession.level, failedQuestionIds.join(',')]
  );

  return newSession;
}
