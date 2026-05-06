import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import challengeReducer from '../pages/challenge-view/store/challenge.slice';
import { challengeSaga } from '../pages/challenge-view/store/challenge.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    challenge: challengeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([
    challengeSaga(),
  ]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
