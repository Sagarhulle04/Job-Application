import { useEffect, useState } from "react";
import { CardText, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addJobApplication } from "../store/slice/jobApplicationSlice";

function Cards({ job }) {
  const token = localStorage.getItem("job");

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  if (!token) {
    return navigate("/login");
  }

  async function handleSubmitResume(id) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `https://job-application-bs6o.onrender.com/apply/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(addJobApplication(res.data.jobsApplied));
      toast.success("Applied Successfully");
      setModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

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
        <Button variant="primary" onClick={() => setModal(!modal)}>
          Apply Now
        </Button>
      </Card.Body>

      {modal && (
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          centered={false}
          dialogClassName="top-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title> Applying For : {job?.companyName} </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicPhoto">
              <Form.Label>Add Resume</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Resume"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmitResume(job?._id)}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Card>
  );
}

export default Cards;
