import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: null,
  reducers: {
    allJob: (state, action) => {
      return (state = action.payload);
    },
    addJob: (state, action) => {
      return action.payload;
    },
  },
});

export default jobSlice.reducer;

export const { allJob, addJob } = jobSlice.actions;
