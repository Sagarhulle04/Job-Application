import React, { useEffect } from "react";
import Navbars from "./Navbars";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../store/slice/userSlice";

const AppLayout = () => {
  const token = localStorage.getItem("job");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    handleUser();
  }, []);

  async function handleUser() {
    try {
      const res = await axios.get(
        "https://job-application-bs6o.onrender.com/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch(addUser(res.data.user));

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      if (error.response?.success === false) {
        navigate("/login");
      }
    }
  }

  return (
    <div>
      <Navbars />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
