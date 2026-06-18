import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("file", file);

      const res = await axios.post(
        "https://job-application-bs6o.onrender.com/register",
        formData,
      );
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.data.success === false) {
        navigate("/register");
      }
    }
  }

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "50%",
        margin: "0 auto",
        border: "1px solid black",
      }}
    >
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Select
          aria-label="Default select example"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Select Prefernce </option>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter photo"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <p>
          Already have an account ?<Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
