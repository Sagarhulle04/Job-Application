import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./pages/User";
import Recruiter from "./pages/Recruiter";
import AppliedJobs from "./pages/JobsApplied";
import CreateJobPost from "./pages/CreateJobPost";
import RecruiterProfile from "./pages/RecruiterProfile";
import AppliedPeopleDetails from "./pages/AppliedPeopleDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<User />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recruiter" element={<Recruiter />} />
            <Route path="/appliedJobs" element={<AppliedJobs />} />
            <Route path="/createJobPost" element={<CreateJobPost />} />
            <Route path="/recruiterProfile" element={<RecruiterProfile />} />
            <Route
              path="/appliedPeopleDetails"
              element={<AppliedPeopleDetails />}
            />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
