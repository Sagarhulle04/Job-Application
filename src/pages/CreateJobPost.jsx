import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addJob } from "../store/slice/jobSlice";

function CreateJobPost() {
  const token = localStorage.getItem("job");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
    return navigate("/login");
  }

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);

  async function handleCreatePost(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("skills", skills);
      formData.append("experience", experience);
      formData.append("file", file);

      const res = await axios.post(
        "https://job-application-bs6o.onrender.com/createJob",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch(addJob(res.data.job));
      toast.success("Job Created Successfully");
      navigate("/recruiter");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "1rem auto",
        padding: "1rem",
        border: "1px solid black",
      }}
    >
      <Form onSubmit={handleCreatePost}>
        <Form.Group className="mb-3" controlId="formBasicComapnyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter Job Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicJobDescription">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            type="text"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter Job Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter Skills"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter Experience"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicJobDescriptionPDF">
          <Form.Label>Job Description PDF</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Job Description PDF"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateJobPost;
