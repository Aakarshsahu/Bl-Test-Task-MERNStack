import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const registerWithGoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegistration = async (e) => {
      e.preventDefault();
      try {
          
          const response = await axios.post('http://localhost:6005/register', userData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.status === 200) {
            
              console.log('User registered successfully!');
              navigate('/dashboard');
              
          } else {
              
              console.error('Registration failed.');
          }
      } catch (error) {
          console.error('Error during registration:', error);
      }
  };
    const googleButtonStyle = {
        boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
        color: "#757575",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif",
        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
        backgroundColor: "white",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "12px 11px",
    };

    return (
        <>
            <div className="registration-page">
                <h1 style={{ textAlign: "center" }} className="text-3xl mb-4">Register</h1>
                <div className="form">
                    <form className='registration-form' onSubmit={handleRegistration}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Name'
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                            className="mb-2 p-2 block w-full border rounded bg-gray-100"
                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email'
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                            className="mb-2 p-2 block w-full border rounded bg-gray-100"
                        />
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder='Phone number'
                            value={userData.phone}
                            onChange={handleInputChange}
                            required
                            className="mb-2 p-2 block w-full border rounded bg-gray-100"
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            value={userData.password}
                            onChange={handleInputChange}
                            required
                            className="mb-2 p-2 block w-full border rounded bg-gray-100"
                        />
                         <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded w-48 ml-2 transition-all duration-300"
                                onClick={handleRegistration}
                            >
                                Register
                            </button>
                        <button
                            type="submit"
                            style={googleButtonStyle}
                            className="p-2 rounded w-full transition-all duration-300"
                            onClick={registerWithGoogle}
                        >
                            Sign In With Google
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
