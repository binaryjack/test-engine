import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ExamResult, ExamSession, Question } from '../../../shared/types/index.js'
import type { GenerateExamInputExtended } from '../api/exam.api.js'

interface ExamState {
  session: ExamSession | null
  questions: Question[]
  result: ExamResult | null
  currentIndex: number
  answers: Record<string, string>    // questionId -> userAnswer
  timings: Record<string, number>    // questionId -> ms spent
  availableCount: number
  loading: boolean
  error: string | null
}

const initialState: ExamState = {
  session: null,
  questions: [],
  result: null,
  currentIndex: 0,
  answers: {},
  timings: {},
  availableCount: 80,
  loading: false,
  error: null
}

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    generateRequest(state, _action: PayloadAction<GenerateExamInputExtended>) {
      state.loading = true
      state.error = null
      state.session = null
      state.questions = []
      state.result = null
      state.currentIndex = 0
      state.answers = {}
      state.timings = {}
    },
    generateSuccess(state, action: PayloadAction<{ session: ExamSession; questions: Question[] }>) {
      state.loading = false
      state.session = action.payload.session
      state.questions = action.payload.questions
    },
    examFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setAnswer(state, action: PayloadAction<{ questionId: string; answer: string }>) {
      state.answers[action.payload.questionId] = action.payload.answer
    },
    setTiming(state, action: PayloadAction<{ questionId: string; ms: number }>) {
      state.timings[action.payload.questionId] = action.payload.ms
    },
    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++
      }
    },
    prevQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--
      }
    },
    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload
    },
    submitRequest(state) {
      state.loading = true
      state.error = null
    },
    submitSuccess(state, action: PayloadAction<ExamResult>) {
      state.loading = false
      state.result = action.payload
    },
    loadSessionRequest(state, _action: PayloadAction<string>) {
      state.loading = true
      state.error = null
    },
    loadResultRequest(state, _action: PayloadAction<string>) {
      state.loading = true
      state.error = null
    },
    loadResultSuccess(state, action: PayloadAction<ExamResult>) {
      state.loading = false
      state.result = action.payload
    },
    deleteExamRequest(state, _action: PayloadAction<string>) {
      state.loading = true
      state.error = null
    },
    deleteExamSuccess(state) {
      state.loading = false
      state.result = null
      state.session = null
    },
    retakeFailedRequest(state, _action: PayloadAction<string>) {
      state.loading = true
      state.error = null
    },
    calculateAvailableCountRequest(state, _action: PayloadAction<{ techs: string[]; level: string }>) {
      // Don't set loading to true as it's a background calculation for the UI
    },
    calculateAvailableCountSuccess(state, action: PayloadAction<number>) {
      state.availableCount = action.payload
    },
    clearExam(state) {
      Object.assign(state, initialState)
    }
  }
})

export const {
  generateRequest,
  generateSuccess,
  examFailure,
  setAnswer,
  setTiming,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  submitRequest,
  submitSuccess,
  loadSessionRequest,
  loadResultRequest,
  loadResultSuccess,
  deleteExamRequest,
  deleteExamSuccess,
  retakeFailedRequest,
  calculateAvailableCountRequest,
  calculateAvailableCountSuccess,
  clearExam
} = examSlice.actions

export default examSlice.reducer
