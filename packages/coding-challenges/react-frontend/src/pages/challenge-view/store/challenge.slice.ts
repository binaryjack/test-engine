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
}

const initialState: ChallengeState = {
  currentChallengeId: null,
  requirements: [],
  loading: false,
};

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    loadChallenge: (state, action: PayloadAction<{ id: string, requirements: Requirement[] }>) => {
      state.loading = true;
      state.currentChallengeId = action.payload.id;
      // We'll set requirements here, but Saga might override from localStorage
      state.requirements = action.payload.requirements;
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
  },
});

export const { loadChallenge, setRequirements, toggleRequirement } = challengeSlice.actions;
export default challengeSlice.reducer;
