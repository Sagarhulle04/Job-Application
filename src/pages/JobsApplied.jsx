import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addJobApplication } from "../store/slice/jobApplicationSlice";
import { useNavigate } from "react-router-dom";

function AppliedJobs() {
  const token = localStorage.getItem("job");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector((state) => state.jobApplication);

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    const res = await axios.get(
      "https://job-application-bs6o.onrender.com/appliedJob",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(addJobApplication(res.data.jobsApplied));
  };

  if (!jobs || jobs.length === 0) {
    return <h3>No Applied Jobs Found</h3>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>Applied Jobs</h1>
      <div>
        {jobs.map((item) => (
          <Card key={item._id} style={{ margin: "1rem" }}>
            <Card.Body>
              <Card.Title>
                {item.jobId.companyName} - {item.jobId.jobTitle}
              </Card.Title>

              <Card.Text>{item.jobId.jobDescription}</Card.Text>

              <p>
                <b>Skills:</b> {item.jobId.skills}
              </p>

              <a href={item.resume} target="_blank">
                View Resume
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AppliedJobs;
