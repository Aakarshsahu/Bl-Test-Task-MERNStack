import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6005/userlogin",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.user, "user res");

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response, "resss");
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dk");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Login</button>
            <p className="message">
              Not Registered? <Link to="/">Create an account</Link>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
