import type { ApiResponse, ExamResult, ExamSession, Question } from '../../../shared/types/index.js'
import { http } from '../../../shared/utils/http.js'

export interface GenerateExamInput {
  technologyId: string
  level: string
  count?: number
  seed?: number
}
export interface GenerateExamInputExtended {
  technologyId?: string
  technologyIds?: string[]
  level: string
  mode: number
  count?: number
  seed?: number
}

export interface SubmitExamInput {
  answers: { questionId: string; userAnswer: string; timeSpent?: number }[]
}

export const examApi = {
  generate: (input: GenerateExamInputExtended) =>
    http.post<ApiResponse<ExamSession>>('/exams/generate', input),

  getSession: (id: string) =>
    http.get<ApiResponse<ExamSession>>(`/exams/${id}`),

  getQuestions: (technologyId?: string, level?: string) => {
    const qs = new URLSearchParams()
    if (technologyId) qs.set('technologyId', technologyId)
    if (level) qs.set('level', level)
    const q = qs.toString()
    return http.get<ApiResponse<Question[]>>(`/questions${q ? `?${q}` : ''}`)
  },

  submit: (sessionId: string, input: SubmitExamInput) =>
    http.post<ApiResponse<ExamResult>>(`/exams/${sessionId}/submit`, input),

  getResults: (sessionId: string) =>
    http.get<ApiResponse<ExamResult>>(`/exams/${sessionId}/results`),

  getResult: (sessionId: string) =>
    http.get<ApiResponse<ExamResult>>(`/exams/${sessionId}/results`),

  delete: (sessionId: string) =>
    http.delete<ApiResponse<void>>(`/exams/${sessionId}`),

  retakeFailed: (sessionId: string, failedQuestionIds: string[]) =>
    http.post<ApiResponse<ExamSession>>(`/exams/${sessionId}/retake`, { failedQuestionIds })
}
