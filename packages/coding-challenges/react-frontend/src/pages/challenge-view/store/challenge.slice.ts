import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Requirement {
  id: string;
  text: string;
  completed: boolean;
}

interface ChallengeState {
  currentChallengeId: string | null;
  requirements: Requirement[];
  loading: boolean;
  isExamMode: boolean;
  examTimeLeft: number; // in seconds
  isExamFinished: boolean;
}

const initialState: ChallengeState = {
  currentChallengeId: null,
  requirements: [],
  loading: false,
  isExamMode: false,
  examTimeLeft: 0,
  isExamFinished: false,
};

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    loadChallenge: (state, action: PayloadAction<{ id: string, requirements: Requirement[], estimatedTime: number }>) => {
      state.loading = true;
      state.currentChallengeId = action.payload.id;
      state.requirements = action.payload.requirements;
      state.examTimeLeft = action.payload.estimatedTime * 60;
      state.isExamMode = false;
      state.isExamFinished = false;
    },
    setRequirements: (state, action: PayloadAction<Requirement[]>) => {
      state.requirements = action.payload;
      state.loading = false;
    },
    toggleRequirement: (state, action: PayloadAction<string>) => {
      const req = state.requirements.find(r => r.id === action.payload);
      if (req) {
        req.completed = !req.completed;
      }
    },
    resetChallenge: (state) => {
      state.requirements = state.requirements.map(req => ({ ...req, completed: false }));
      // We don't reset the timer here, only the requirements
    },
    resetAllChallenges: (state) => {
      state.requirements = state.requirements.map(req => ({ ...req, completed: false }));
    },
    startExam: (state) => {
      state.isExamMode = true;
      state.isExamFinished = false;
    },
    stopExam: (state) => {
      state.isExamMode = false;
    },
    tickExam: (state) => {
      if (state.examTimeLeft > 0) {
        state.examTimeLeft -= 1;
      } else {
        state.isExamMode = false;
        state.isExamFinished = true;
      }
    },
    closeExamModal: (state) => {
      state.isExamFinished = false;
    },
  },
});

export const { 
  loadChallenge, 
  setRequirements, 
  toggleRequirement, 
  resetChallenge, 
  resetAllChallenges,
  startExam,
  stopExam,
  tickExam,
  closeExamModal 
} = challengeSlice.actions;
export default challengeSlice.reducer;
