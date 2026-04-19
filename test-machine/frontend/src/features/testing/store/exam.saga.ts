import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import type { ApiResponse, ExamResult, ExamSession, Question } from '../../../shared/types/index.js'
import type { RootState } from '../../../store/index.js'
import { examApi, GenerateExamInput, SubmitExamInput } from '../api/exam.api.js'
import {
    examFailure,
    generateRequest,
    generateSuccess,
    loadResultRequest,
    loadResultSuccess,
    retakeFailedRequest,
    submitRequest,
    submitSuccess
} from './exam.slice.js'

function* handleLoadResult(action: PayloadAction<string>) {
  const res: ApiResponse<ExamResult> = yield call(examApi.getResult, action.payload)
  if (res.success && res.data) {
    yield put(loadResultSuccess(res.data))
  } else {
    yield put(examFailure(res.error ?? 'Failed to load results'))
  }
}

function* handleGenerate(action: PayloadAction<GenerateExamInput>) {
  const sessionRes: ApiResponse<ExamSession> = yield call(examApi.generate, action.payload)
  if (!sessionRes.success || !sessionRes.data) {
    yield put(examFailure(sessionRes.error ?? 'Failed to generate exam'))
    return
  }
  const questionsRes: ApiResponse<Question[]> = yield call(
    examApi.getQuestions,
    action.payload.technologyId,
    action.payload.level
  )
  if (!questionsRes.success || !questionsRes.data) {
    yield put(examFailure(questionsRes.error ?? 'Failed to load questions'))
    return
  }
  // Filter to only the questions in this session
  const questionIds = sessionRes.data.questionIds
  const questions = questionsRes.data.filter(q => questionIds.includes(q.id))
  yield put(generateSuccess({ session: sessionRes.data, questions }))
}

function* handleRetakeFailed(action: PayloadAction<string>) {
  try {
    const sessionRes: ApiResponse<ExamSession> = yield call(examApi.retakeFailed, action.payload)
    if (!sessionRes.success || !sessionRes.data) {
      yield put(examFailure(sessionRes.error ?? 'Failed to generate retake exam'))
      return
    }

    // Get the original result to determine technology and level... actually we have it from sessionRes
    // We need to load the questions for the new session
    const questionIds = sessionRes.data.questionIds
    // We'll fetch questions from the technology, but we need to know which ones are in this session
    // Since we have questionIds in the session, we can just use those
    const questionsRes: ApiResponse<Question[]> = yield call(
      examApi.getQuestions,
      sessionRes.data.technologyId,
      sessionRes.data.level
    )
    if (!questionsRes.success || !questionsRes.data) {
      yield put(examFailure(questionsRes.error ?? 'Failed to load questions'))
      return
    }
    const questions = questionsRes.data.filter(q => questionIds.includes(q.id))
    yield put(generateSuccess({ session: sessionRes.data, questions }))
  } catch (err: unknown) {
    yield put(examFailure((err as Error)?.message ?? 'Failed to retake exam'))
  }
}

function* handleSubmit() {
  const state: RootState = yield select()
  const { session, answers, timings } = state.exam
  if (!session) {
    yield put(examFailure('No active session'))
    return
  }
  const input: SubmitExamInput = {
    answers: Object.entries(answers).map(([questionId, userAnswer]) => ({
      questionId,
      userAnswer,
      timeSpent: timings[questionId] ?? 0
    }))
  }
  const res: ApiResponse<ExamResult> = yield call(examApi.submit, session.id, input)
  if (res.success && res.data) {
    yield put(submitSuccess(res.data))
  } else {
    yield put(examFailure(res.error ?? 'Submission failed'))
  }
}

export function* examSaga() {
  yield takeLatest(generateRequest.type, handleGenerate)
  yield takeLatest(submitRequest.type, handleSubmit)
  yield takeLatest(loadResultRequest.type, handleLoadResult)
  yield takeLatest(retakeFailedRequest.type, handleRetakeFailed)
}
