import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}


useEffect(() => {
  getUser()
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:6005/getAllUsers');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  fetchUsers();
}, [])

const handleUserClick = (userId) => {
  
  navigate(`/dashboard/user/${userId}`);
};

  return (
    <>
    <div style={{textAlign:"center"}}>
        <h1>Dashboard</h1>
      </div>
      <div>
      <h1 style={{textAlign:"center"}}>Registered User List</h1>
      <ul style={{textAlign:"center",listStyleType:"none",lineHeight:"200%"}}>
        {users.map((user) => (
          <li style={{fontSize:"20px"}} key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Dashboard