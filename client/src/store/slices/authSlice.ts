import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// --- Attempt to load initial state from localStorage ---
const token = localStorage.getItem('token');
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
  user: user,
  token: token,
  status: token ? 'succeeded' : 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
      // --- Persist to localStorage ---
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      // --- Clear from localStorage ---
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;