import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logUserOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { logUserIn, logUserOut } = userSlice.actions;

export default userSlice.reducer;