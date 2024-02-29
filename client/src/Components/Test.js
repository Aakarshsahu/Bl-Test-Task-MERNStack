import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    toast("Here u can view all use...!");
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:6005/getAllUsers");

        console.log(response, "data");

        if (response.status === 200) {
          setUsers(response.data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/dashboard/user/${userId}`);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Dashboard</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Registered User List</h1>
        <ul
          style={{
            textAlign: "center",
            listStyleType: "none",
            lineHeight: "200%",
          }}
        >
          {users.map((user) => (
            <li
              style={{ fontSize: "20px" , cursor:"pointer" }}
              key={user.id}
              onClick={() => handleUserClick(user._id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
