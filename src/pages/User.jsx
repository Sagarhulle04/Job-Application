import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { allJob } from "../store/slice/jobSlice";
import Cards from "../components/Cards";

const User = () => {
  const token = localStorage.getItem("job");
  const dispatch = useDispatch();
  const job = useSelector((store) => store.job) || [];
  const navigate = useNavigate();

  console.log(job);

  async function handleJobList() {
    try {
      const res = await axios.get(
        "https://job-application-bs6o.onrender.com/allJobList",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(allJob(res.data.job));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    handleJobList();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>All Jobs</h1>
      <div style={{ maxWidth: "80%", margin: "2rem auto" }}>
        {job?.map((job) => (
          <Cards key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default User;
