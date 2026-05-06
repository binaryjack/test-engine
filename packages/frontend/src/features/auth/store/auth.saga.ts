import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import type { ApiResponse, User } from '../../../shared/types/index.js'
import { authApi, LoginResponse } from '../api/auth.api.js'
import {
    authFailure,
    authSuccess,
    loadUserRequest,
    loadUserSuccess,
    loginRequest,
    logout,
    registerRequest
} from './auth.slice.js'

function* handleLogin(action: PayloadAction<{ email: string; password: string }>) {
  const res: ApiResponse<LoginResponse> = yield call(authApi.login, action.payload)
  if (res.success && res.data) {
    yield put(authSuccess(res.data))
  } else {
    yield put(authFailure(res.error ?? 'Login failed'))
  }
}

function* handleRegister(action: PayloadAction<{ email: string; password: string; displayName: string }>) {
  const res: ApiResponse<LoginResponse> = yield call(authApi.register, action.payload)
  if (res.success && res.data) {
    yield put(authSuccess(res.data))
  } else {
    yield put(authFailure(res.error ?? 'Registration failed'))
  }
}

function* handleLoadUser() {
  const res: ApiResponse<User> = yield call(authApi.me)
  if (res.success && res.data) {
    yield put(loadUserSuccess(res.data))
  } else {
    // Token invalid/expired or user deleted — clear session
    yield put(logout())
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin)
  yield takeLatest(registerRequest.type, handleRegister)
  yield takeLatest(loadUserRequest.type, handleLoadUser)
}
