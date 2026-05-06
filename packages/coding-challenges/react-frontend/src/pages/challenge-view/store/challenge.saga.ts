import { RootState } from '@/store/index.js';
import { delay, put, race, select, take, takeLatest } from 'redux-saga/effects';
import {
    startExam,
    stopExam,
    tickExam
} from './challenge.slice';
import { loadChallenge, Requirement, resetAllChallenges, resetChallenge, setRequirements, toggleRequirement } from './challenge.slice.js';

const STORAGE_KEY = 'challenge_progress';

function* handleLoadChallenge(action: ReturnType<typeof loadChallenge>) {
  const { id, requirements } = action.payload;
  const saved = localStorage.getItem(`${STORAGE_KEY}_${id}`);
  
  if (saved) {
    try {
      const savedRequirements: Requirement[] = JSON.parse(saved);
      // Merge saved completion status with current requirements in case metadata changed
      const merged = requirements.map(req => {
        const savedReq = savedRequirements.find(s => s.id === req.id);
        return savedReq ? { ...req, completed: savedReq.completed } : req;
      });
      yield put(setRequirements(merged));
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
      yield put(setRequirements(requirements));
    }
  } else {
    yield put(setRequirements(requirements));
  }
}

function* handlePersistence() {
  const state: RootState = yield select((state: RootState) => state);
  const { currentChallengeId, requirements } = state.challenge;
  
  if (currentChallengeId) {
    localStorage.setItem(
      `${STORAGE_KEY}_${currentChallengeId}`,
      JSON.stringify(requirements)
    );
  }
}

function* handleResetChallenge() {
  const state: RootState = yield select((state: RootState) => state);
  const { currentChallengeId } = state.challenge;
  
  if (currentChallengeId) {
    localStorage.removeItem(`${STORAGE_KEY}_${currentChallengeId}`);
  }
}

function* handleResetAllChallenges() {
  // Find all keys in localStorage that start with our prefix
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(STORAGE_KEY)) {
      localStorage.removeItem(key);
    }
  });
  console.log('All challenge progress cleared from local storage.');
}

function* watchExamTimer() {
  while (true) {
    yield take(startExam.type);
    
    yield race({
      timer: (function* () {
        while (true) {
          yield delay(1000);
          yield put(tickExam());
          
          const state: RootState = yield select((state: RootState) => state);
          if (state.challenge.examTimeLeft <= 0) break;
        }
      })(),
      cancel: take(stopExam.type),
      newChallenge: take(loadChallenge.type) // Reset timer if user switches challenge
    });
  }
}

export function* challengeSaga() {
  yield takeLatest(loadChallenge.type, handleLoadChallenge);
  yield takeLatest(toggleRequirement.type, handlePersistence);
  yield takeLatest(resetChallenge.type, handleResetChallenge);
  yield takeLatest(resetAllChallenges.type, handleResetAllChallenges);
  yield watchExamTimer();
}
