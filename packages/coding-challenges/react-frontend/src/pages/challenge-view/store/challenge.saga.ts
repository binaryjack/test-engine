import { call, delay, put, race, select, take, takeLatest } from 'redux-saga/effects';
import { challengeRegistry } from '../../../challenges/index.js';
import { RootState } from '../../../store/index.js';
import { tester } from '../../../utils/tester/BrowserTester.js';
import { loadChallengeComponent, loadChallengeTestSuite } from '../../../utils/tester/ChallengeLoader.js';
import {
  loadChallenge,
  Requirement,
  resetAllChallenges,
  resetChallenge,
  restoreExam,
  runVerification,
  setRequirements,
  setTestResults,
  startExam,
  stopExam,
  tickExam,
  toggleRequirement
} from './challenge.slice.js';

const STORAGE_KEY = 'challenge_progress';
const TIMER_KEY = 'exam_timer';

function* handleLoadChallenge(action: ReturnType<typeof loadChallenge>) {
  const { id, requirements } = action.payload;
  const state: RootState = yield select((state: RootState) => state);
  const prevId = state.challenge.currentChallengeId;

  // 0. Clean up previous challenge timer if ID changed (meaning user navigated away and into a new one)
  if (prevId && prevId !== id) {
    localStorage.removeItem(`${TIMER_KEY}_${prevId}`);
  }
  
  // 1. Restore requirements progress
  const saved = localStorage.getItem(`${STORAGE_KEY}_${id}`);
  if (saved) {
    try {
      const savedRequirements: Requirement[] = JSON.parse(saved);
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

  // 2. Restore timer session if any
  const savedTimer = localStorage.getItem(`${TIMER_KEY}_${id}`);
  if (savedTimer) {
    const timeLeft = parseInt(savedTimer, 10);
    if (timeLeft > 0) {
      yield put(restoreExam(timeLeft));
      yield put(startExam()); // Re-start the countdown loop
    }
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

function* handleTimerTick() {
  const state: RootState = yield select((state: RootState) => state);
  const { currentChallengeId, examTimeLeft, isExamMode } = state.challenge;
  
  if (isExamMode && currentChallengeId) {
    localStorage.setItem(`${TIMER_KEY}_${currentChallengeId}`, examTimeLeft.toString());
  }
}

function* handleCleanup() {
  const state: RootState = yield select((state: RootState) => state);
  const { currentChallengeId } = state.challenge;
  if (currentChallengeId) {
    localStorage.removeItem(`${TIMER_KEY}_${currentChallengeId}`);
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
  // Find all keys in localStorage that start with our prefixes
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(STORAGE_KEY) || key.startsWith(TIMER_KEY)) {
      localStorage.removeItem(key);
    }
  });
  console.log('All challenge progress and timers cleared.');
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
          if (state.challenge.examTimeLeft <= 0) {
            // Time is up! Clean up storage
            if (state.challenge.currentChallengeId) {
              localStorage.removeItem(`${TIMER_KEY}_${state.challenge.currentChallengeId}`);
            }
            break;
          }
        }
      })(),
      cancel: take([stopExam.type, loadChallenge.type])
    });
  }
}

function* handleRunVerification() {
  const state: RootState = yield select((state: RootState) => state);
  const { currentChallengeId } = state.challenge;
  
  if (!currentChallengeId) return;
  
  const challenge = challengeRegistry.find(c => c.id === currentChallengeId);
  if (!challenge) return;

  try {
    // 1. Dynamically import the user's Challenge component via the Vite-friendly loader
    const ChallengeComponent = yield call(loadChallengeComponent, challenge.path);

    // 2. Dynamically import the test suite via the Vite-friendly loader
    const testSuite= yield call(loadChallengeTestSuite, challenge.path);

    // 3. Run the tests
    const results= yield call([tester, tester.runChallengeTests], ChallengeComponent, testSuite);

    // 4. Update the state
    yield put(setTestResults(results));
  } catch (err: any) {
    console.error('Verification failed', err);
    // You could dispatch a global error action here if needed
    yield put(setTestResults({})); 
  }
}

export function* challengeSaga() {
  yield takeLatest(loadChallenge.type, handleLoadChallenge);
  yield takeLatest(toggleRequirement.type, handlePersistence);
  yield takeLatest(tickExam.type, handleTimerTick);
  yield takeLatest(stopExam.type, handleCleanup);
  yield takeLatest(resetChallenge.type, handleResetChallenge);
  yield takeLatest(resetAllChallenges.type, handleResetAllChallenges);
  yield takeLatest(runVerification.type, handleRunVerification);
  yield watchExamTimer();
}
