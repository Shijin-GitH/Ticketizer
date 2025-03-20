import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially no user data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Save user JSON
    },
    clearUser: (state) => {
      state.user = null; // Clear user on logout
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;