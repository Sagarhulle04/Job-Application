import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { seeJobApplied } from "../store/slice/jobApplicationSlice";
import { useEffect } from "react";
import Cards from "../components/Cards";
import RecruiterPostedJobs from "../components/RecruiterPostedJobs";
import { useNavigate } from "react-router-dom";

function RecruiterProfile() {
  const token = localStorage.getItem("job");

  const user = useSelector((store) => store.user);
  const job = useSelector((store) => store.jobApplication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleJobPostedByMe() {
    try {
      const res = await axios.get(
        "https://job-application-bs6o.onrender.com/jobPostedByMe",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch(seeJobApplied(res.data.postedJobs));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    handleJobPostedByMe();
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
      }}
    >
      <Card
        style={{
          border: "none",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Body>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <img
              src={user?.photo}
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #0d6efd",
              }}
            />

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                {user?.name}
              </h2>

              <p className="text-muted mb-3">{user?.companyName}</p>

              <Card.Text>
                <strong>Email:</strong> {user?.email}
              </Card.Text>

              <Card.Text>
                <strong>Role:</strong> {user?.role}
              </Card.Text>

              <Button variant="primary">Edit Profile</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div>
        <h1 style={{ textAlign: "center", margin: "1rem auto" }}>
          Your posted jobs
        </h1>
        {job?.map((job) => (
          <RecruiterPostedJobs key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default RecruiterProfile;
