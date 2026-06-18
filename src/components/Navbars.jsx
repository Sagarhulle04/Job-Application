import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../store/slice/userSlice";

function Navbars() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  function handleLogout() {
    localStorage.removeItem("job");
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={user?.role === "user" ? "/" : "/recruiter"}>
          Job-Application
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                {user?.role === "recruiter" && (
                  <Nav.Link as={Link} to="/createJobPost">
                    {" "}
                    Create Post
                  </Nav.Link>
                )}
                {user?.role === "user" && (
                  <Nav.Link as={Link} to="/appliedJobs">
                    {" "}
                    Applied Jobs
                  </Nav.Link>
                )}
                <Nav.Link
                  as={Link}
                  to={user?.role === "user" ? "/" : "/recruiterProfile"}
                >
                  {user?.name}
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                  {" "}
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  {" "}
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  {" "}
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
