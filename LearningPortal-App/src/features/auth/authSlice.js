import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOutUser: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export default authSlice.reducer;

export const { logOutUser, loginUser } = authSlice.actions;
