import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slice/userSlice.js";
import jobSlice from "./slice/jobSlice.js";
import jobApplicationSlice from "./slice/jobApplicationSlice.js";

const store = configureStore({
  reducer: {
    user: userAuth,
    job: jobSlice,
    jobApplication: jobApplicationSlice,
  },
});

export default store;
