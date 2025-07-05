// Redux slice for authimport { createSlice } from '@reduxjs/toolkit';

// Attempt to load initial state from localStorage for session persistence
const token = localStorage.getItem('token');
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;