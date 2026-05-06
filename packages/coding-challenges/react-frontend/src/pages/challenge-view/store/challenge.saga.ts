import { RootState } from '@/store/index.js';
import { put, select, takeLatest } from 'redux-saga/effects';
import { loadChallenge, Requirement, setRequirements, toggleRequirement } from './challenge.slice.js';


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

export function* challengeSaga() {
  yield takeLatest(loadChallenge.type, handleLoadChallenge);
  yield takeLatest(toggleRequirement.type, handlePersistence);
}
