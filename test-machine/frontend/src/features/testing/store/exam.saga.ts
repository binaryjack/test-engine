import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import type { ApiResponse, ExamResult, ExamSession, Question } from '../../../shared/types/index.js'
import type { RootState } from '../../../store/index.js'
import { loadHistoryRequest, loadStatsRequest } from '../../analytics/store/analytics.slice.js'
import { examApi, GenerateExamInputExtended, SubmitExamInput } from '../api/exam.api.js'
import {
    calculateAvailableCountRequest,
    calculateAvailableCountSuccess,
    deleteExamRequest,
    deleteExamSuccess,
    examFailure,
    generateRequest,
    generateSuccess,
    loadResultRequest,
    loadResultSuccess,
    loadSessionRequest,
    retakeFailedRequest,
    submitRequest,
    submitSuccess
} from './exam.slice.js'

function* handleLoadSession(action: PayloadAction<string>) {
  try {
    const res: ApiResponse<ExamSession> = yield call(examApi.getSession, action.payload)
    if (!res.success || !res.data) {
      yield put(examFailure(res.error ?? 'Failed to load session'))
      return
    }
    const sess = res.data

    // Fetch all questions to ensure we can filter for the specific session IDs, 
    // especially for mixed-technology or retake sessions.
    const qres: ApiResponse<Question[]> = yield call(examApi.getQuestions, undefined, undefined)
    if (!qres.success || !qres.data) {
      yield put(examFailure(qres.error ?? 'Failed to load questions'))
      return
    }

    const allQuestions = qres.data
    const sessionQuestions = allQuestions.filter(q => sess.questionIds.includes(q.id))

    yield put(generateSuccess({ session: sess, questions: sessionQuestions }))
  } catch (err: unknown) {
    yield put(examFailure((err as Error)?.message ?? 'Failed to load session'))
  }
}

function* handleLoadResult(action: PayloadAction<string>) {
  const res: ApiResponse<ExamResult> = yield call(examApi.getResult, action.payload)
  if (res.success && res.data) {
    yield put(loadResultSuccess(res.data))
  } else {
    yield put(examFailure(res.error ?? 'Failed to load results'))
  }
}

function* handleDeleteExam(action: PayloadAction<string>) {
  try {
    const res: ApiResponse<void> = yield call(examApi.delete, action.payload)
    if (res.success) {
      yield put(deleteExamSuccess())
      // Also refresh analytics data
      yield put(loadHistoryRequest())
      yield put(loadStatsRequest())
    } else {
      yield put(examFailure(res.error ?? 'Failed to delete exam'))
    }
  } catch (err: unknown) {
    yield put(examFailure((err as Error)?.message ?? 'Failed to delete exam'))
  }
}

function* handleGenerate(action: PayloadAction<GenerateExamInputExtended>) {
  const sessionRes: ApiResponse<ExamSession> = yield call(examApi.generate, action.payload)
  if (!sessionRes.success || !sessionRes.data) {
    yield put(examFailure(sessionRes.error ?? 'Failed to generate exam'))
    return
  }
  // Fetch questions for each requested technology (support multiple techs)
  const techs: string[] = action.payload.technologyIds && action.payload.technologyIds.length > 0
    ? action.payload.technologyIds
    : action.payload.technologyId
      ? [action.payload.technologyId]
      : (sessionRes.data.technologyId ? [sessionRes.data.technologyId] : [])

  let allQuestions: Question[] = []
  if (techs.length === 0) {
    const qRes: ApiResponse<Question[]> = yield call(examApi.getQuestions, undefined, action.payload.level)
    if (!qRes.success || !qRes.data) { yield put(examFailure(qRes.error ?? 'Failed to load questions')); return }
    allQuestions = qRes.data
  } else {
    for (const t of techs) {
      const qRes: ApiResponse<Question[]> = yield call(examApi.getQuestions, t, action.payload.level)
      if (!qRes.success || !qRes.data) { yield put(examFailure(qRes.error ?? 'Failed to load questions')); return }
      allQuestions = allQuestions.concat(qRes.data)
    }
  }

  // Filter to only the questions in this session
  const questionIds = sessionRes.data.questionIds
  const questions = allQuestions.filter(q => questionIds.includes(q.id))
  yield put(generateSuccess({ session: sessionRes.data, questions }))
}

function* handleRetakeFailed(action: PayloadAction<string>) {
  try {
    const state: RootState = yield select()
    const { result } = state.exam
    if (!result) {
      yield put(examFailure('No exam result found to retake from'))
      return
    }
    const answersOfSession = result.answers.filter(o => o.sessionId === action.payload)
    const failedAnsers = answersOfSession.filter(o => !o.isCorrect)
    const failedQuestionIds =failedAnsers.map(o => o.questionId)


    if (failedQuestionIds.length === 0) {
      yield put(examFailure('No failed questions to retake'))
      return
    }

    const sessionRes: ApiResponse<ExamSession> = yield call(examApi.retakeFailed, action.payload, failedQuestionIds)
    if (!sessionRes.success || !sessionRes.data) {
      console.error('API Error:', sessionRes)
      yield put(examFailure(sessionRes.error ?? 'Failed to generate retake exam'))
      return
    }

    // We need to load the questions for the new session
    const questionIds = sessionRes.data.questionIds
    // Use the existing questions from the results to ensure consistency across multiple technologies
    const questions = result.questions.filter((q: any) => questionIds.includes(q.id))
    
    yield put(generateSuccess({ session: sessionRes.data, questions }))
  } catch (err: unknown) {
    console.error('Saga try-catch caught:', err)
    yield put(examFailure((err as Error)?.message ?? 'Failed to retake exam'))
  }
}

function* handleCalculateAvailableCount(action: PayloadAction<{ techs: string[]; level: string }>) {
  try {
    let total = 0
    const { techs, level } = action.payload

    if (techs.length === 0) {
      const res: ApiResponse<Question[]> = yield call(examApi.getQuestions, undefined, level || undefined)
      if (res.success && res.data) total = res.data.length
    } else {
      for (const tid of techs) {
        const res: ApiResponse<Question[]> = yield call(examApi.getQuestions, tid, level || undefined)
        if (res.success && res.data) total += res.data.length
      }
    }
    yield put(calculateAvailableCountSuccess(total || 1))
  } catch (err) {
    // Ignore error for background calculation, fallback to 1 is handled in component
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
  yield takeLatest(loadSessionRequest.type, handleLoadSession)
  yield takeLatest(loadResultRequest.type, handleLoadResult)
  yield takeLatest(retakeFailedRequest.type, handleRetakeFailed)
  yield takeLatest(calculateAvailableCountRequest.type, handleCalculateAvailableCount)
  yield takeLatest(deleteExamRequest.type, handleDeleteExam)
}
