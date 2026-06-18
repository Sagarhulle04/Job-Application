import { createSlice } from "@reduxjs/toolkit";

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState: null,
  reducers: {
    addJobApplication: (state, action) => {
      return action.payload;
    },
    seeJobApplied: (state, action) => {
      return action.payload;
    },
    appliedJobApplication: (state, action) => {
      return action.payload;
    },
  },
});

export default jobApplicationSlice.reducer;

export const { addJobApplication, seeJobApplied, appliedJobApplication } =
  jobApplicationSlice.actions;
