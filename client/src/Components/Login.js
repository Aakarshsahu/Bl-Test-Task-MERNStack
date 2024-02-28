import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
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
      const response = await fetch('http://localhost:6005/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const loginwithgoogle = () => {
    window.open('http://localhost:6005/auth/google/callback', '_self');
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <div className="form">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
            <p className="message">
              Not Registered? <a href="#">Create an account</a>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
