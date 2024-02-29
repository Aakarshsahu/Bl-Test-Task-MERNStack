import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Headers = () => {
  const [userdata, setUserdata] = useState({});
  const session = sessionStorage.getItem("user");
  const u_d = JSON.parse(session);
  console.log(u_d, "ussss");

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });

      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.open("http://localhost:6005/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <header>
        <nav>
          <div className="left"></div>
          <div className="right">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {Object?.keys(userdata)?.length > 0 || u_d ? (
                <>
                  <li style={{ color: "black", fontWeight: "bold" }}>
                    {userdata ? userdata.displayName : u_d.name}
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li onClick={logout}>Logout</li>
                  <li>
                    <img
                      src={userdata?.image}
                      style={{ width: "50px", borderRadius: "50%" }}
                      alt=""
                    />
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Headers;
