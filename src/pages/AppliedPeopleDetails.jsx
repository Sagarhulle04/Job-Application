import { useEffect, useState } from "react";
import { CardText, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
  addJobApplication,
  appliedJobApplication,
} from "../store/slice/jobApplicationSlice";
import { useDispatch, useSelector } from "react-redux";

function AppliedPeopleDetails() {
  const token = localStorage.getItem("job");

  const { state } = useLocation();
  const dispatch = useDispatch();
  const applications = useSelector((store) => store?.jobApplication);

  const job = state?.job;

  async function handleAppliedJob() {
    try {
      const res = await axios.get(
        "https://job-application-bs6o.onrender.com/getApplications",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(appliedJobApplication(res?.data?.getAppliedJobDetails));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    handleAppliedJob();
  }, []);

  console.log(applications);

  return (
    <Card style={{ margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          {" "}
          {job?.companyName} - {job?.jobTitle}
        </Card.Title>
        <Card.Text style={{}}>
          {" "}
          <span style={{ color: "black", fontWeight: "600" }}>
            Job Description
          </span>{" "}
          : {job?.jobDescription}
        </Card.Text>

        <CardText>
          {" "}
          <span style={{ color: "black", fontWeight: "600" }}>
            Skills
          </span> : {job?.skills}{" "}
        </CardText>

        <Card.Text>
          <Link to={job?.jobDescriptionPDF} target="_blank">
            Job Description PDF
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AppliedPeopleDetails;
