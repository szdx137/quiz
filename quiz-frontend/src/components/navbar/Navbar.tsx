import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import logout from "../logout";
import { useNavigate } from "react-router";

import "./Navbar.scss";
import axiosInstance from "../../axios";

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    console.log("logout");

    const response = axiosInstance.post("auth/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/login");
  }

  return (
    <header className="nav-header">
      <div className="nav-container">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "active-class" : "non-active-class"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "active-class" : "non-active-class"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/score"
                className={({ isActive }) =>
                  isActive ? "active-class" : "non-active-class"
                }
              >
                My Score
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-class" : "non-active-class"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? "active-class" : "non-active-class"
                }
              >
                FAQ
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="signout-container">
        <button className="signout-button" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
