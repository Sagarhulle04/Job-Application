import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { batch, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../store/slice/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://job-application-bs6o.onrender.com/login",
        {
          email,
          password,
        },
      );
      localStorage.setItem("job", res.data.token);
      dispatch(addUser(res.data.user));
      toast.success("Logged In Successfully");

      if (res.data.user.role === "user") {
        return navigate("/");
      }
      if (res.data.user.role === "recruiter") {
        return navigate("/recruiter");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.data.success === false) {
        navigate("/login");
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

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <p>
          Dont have an account ?<Link to="/register">Register</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
