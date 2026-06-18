import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export default userAuth.reducer;

export const { addUser, removeUser } = userAuth.actions;
