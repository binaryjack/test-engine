import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import type { ApiResponse, Question, Technology, User } from '../../../shared/types/index.js'
import { adminApi, AdminStats, CreateQuestionInput, CreateTechnologyInput } from '../api/admin.api.js'
import {
    adminFailure,
    bulkImportQuestionsRequest,
    createQuestionRequest,
    createTechnologyRequest,
    deleteQuestionRequest,
    loadPublicTechnologiesRequest, loadPublicTechnologiesSuccess,
    loadQuestionsRequest, loadQuestionsSuccess,
    loadStatsRequest, loadStatsSuccess,
    loadTechnologiesRequest, loadTechnologiesSuccess,
    loadUsersRequest, loadUsersSuccess,
    questionDeleted,
    seedDatabaseEnd,
    seedDatabaseRequest
} from './admin.slice.js'

function* handleLoadStats() {
  const res: ApiResponse<AdminStats> = yield call(adminApi.getStats)
  if (res.success && res.data) yield put(loadStatsSuccess(res.data))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleLoadTechnologies() {
  const res: ApiResponse<Technology[]> = yield call(adminApi.listAllTechnologies)
  if (res.success && res.data) yield put(loadTechnologiesSuccess(res.data))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleLoadPublicTechnologies() {
  const res: ApiResponse<Technology[]> = yield call(adminApi.listPublicTechnologies)
  if (res.success && res.data) yield put(loadPublicTechnologiesSuccess(res.data))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleLoadQuestions(action: PayloadAction<{ technologyId?: string; level?: string; topic?: string } | undefined>) {
  const res: ApiResponse<Question[]> = yield call(adminApi.listQuestions, action.payload ?? {})
  if (res.success && res.data) yield put(loadQuestionsSuccess(res.data))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleLoadUsers() {
  const res: ApiResponse<User[]> = yield call(adminApi.getUsers)
  if (res.success && res.data) yield put(loadUsersSuccess(res.data))
  else yield put(adminFailure(res.error ?? 'Failed'))
}


function* handleSeedDatabase() {
  const res: ApiResponse<string> = yield call(adminApi.seedDatabase)
  if (res.success && res.data) yield put(seedDatabaseEnd(''))
  else yield put(seedDatabaseEnd(res.error ?? 'Failed'))
}


function* handleCreateTechnology(action: PayloadAction<CreateTechnologyInput>) {
  const res: ApiResponse<Technology> = yield call(adminApi.createTechnology, action.payload)
  if (res.success) yield put(loadTechnologiesRequest())
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleCreateQuestion(action: PayloadAction<CreateQuestionInput>) {
  const res: ApiResponse<Question> = yield call(adminApi.createQuestion, action.payload)
  if (res.success) yield put(loadQuestionsRequest(undefined))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleBulkImport(action: PayloadAction<CreateQuestionInput[]>) {
  const res: ApiResponse<{ inserted: number, skipped: number, duplicates: string[] }> = yield call(adminApi.bulkImportQuestions, action.payload)
  if (res.success && res.data) {
    const { inserted, skipped } = res.data
    alert(`Bulk import complete:\n- ${inserted} questions inserted\n- ${skipped} duplicates skipped`)
    yield put(loadQuestionsRequest(undefined))
  } else {
    yield put(adminFailure(res.error ?? 'Bulk import failed'))
  }
}

function* handleUpdateQuestion(action: PayloadAction<{ id: string; data: Partial<CreateQuestionInput> }>) {
  const res: ApiResponse<Question> = yield call(adminApi.updateQuestion, action.payload.id, action.payload.data)
  if (res.success) yield put(loadQuestionsRequest(undefined))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

function* handleDeleteQuestion(action: PayloadAction<string>) {
  const res: ApiResponse<void> = yield call(adminApi.deleteQuestion, action.payload)
  if (res.success) yield put(questionDeleted(action.payload))
  else yield put(adminFailure(res.error ?? 'Failed'))
}

export function* adminSaga() {
  yield takeLatest(loadStatsRequest.type, handleLoadStats)
  yield takeLatest(loadTechnologiesRequest.type, handleLoadTechnologies)
  yield takeLatest(loadPublicTechnologiesRequest.type, handleLoadPublicTechnologies)
  yield takeLatest(loadQuestionsRequest.type, handleLoadQuestions)
  yield takeLatest(loadUsersRequest.type, handleLoadUsers)
  yield takeLatest(createTechnologyRequest.type, handleCreateTechnology)
  yield takeLatest(createQuestionRequest.type, handleCreateQuestion)
  yield takeLatest(bulkImportQuestionsRequest.type, handleBulkImport)
  yield takeLatest('admin/updateQuestionRequest', handleUpdateQuestion)
  yield takeLatest(deleteQuestionRequest.type, handleDeleteQuestion)
  yield takeLatest(seedDatabaseRequest.type, handleSeedDatabase)

  
}
