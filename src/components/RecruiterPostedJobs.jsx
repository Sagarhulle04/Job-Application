import { CardText, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import AppliedPeopleDetails from "../pages/AppliedPeopleDetails";

function RecruiterPostedJobs({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <Button
          variant="primary"
          onClick={() =>
            navigate("/appliedPeopleDetails", {
              state: { job },
            })
          }
        >
          Click here to see details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecruiterPostedJobs;
