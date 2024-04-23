import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // const initialRegisterFormData = Object.freeze({
  //   'first_name':
  // })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login and registration logic here
    console.log("inside");
    if (isRegister) {
      console.log("inside **1");

      axiosInstance
        .post(`/auth/register/`, {
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });

      console.log("Email:", email);
      console.log("Password:", password);
      // navigate("/login");
      setIsRegister(false);
      setEmail("");
      setPassword("");
    } else {
      console.log("inside **2");

      axiosInstance
        .post(`/auth/token/`, {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          // history.push('/');
          //console.log(res);
          //console.log(res.data);
          navigate("/home");
        });
    }
  };

  function onRegisterClick() {
    setIsRegister(true);
  }
  function onLoginClick() {
    setIsRegister(false);
  }

  const showFirstNameField = (
    <div className="form-group">
      <label htmlFor="name">First Name</label>
      <input
        type="text"
        id="first-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </div>
  );

  const showLastNameField = (
    <div className="form-group">
      <label htmlFor="name">Last Name</label>
      <input
        type="text"
        id="last-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </div>
  );

  const showForgotPassword = (
    <div className="forgot">
      <a href="/forgot">Forgot password</a>
    </div>
  );

  const showRegister = (
    <div className="register">
      <p>
        Don't have account?{" "}
        <a href="#" onClick={onRegisterClick}>
          Register
        </a>
      </p>
    </div>
  );

  const showLogin = (
    <div className="register">
      <p>
        <a href="#" onClick={onLoginClick}>
          Login
        </a>
      </p>
    </div>
  );

  const showLoginButton = (
    <button type="submit" className="submit-btn">
      Login
    </button>
  );

  const showRegisterButton = (
    <button type="submit" className="submit-btn">
      Register
    </button>
  );

  return (
    <div className="login-page">
      <div className="container">
        <h1>WELCOME TO QUIZ GAME</h1>
        {isRegister ? <h2>Register</h2> : <h2>Login</h2>}
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && showFirstNameField}
          {isRegister && showLastNameField}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegister ? showRegisterButton : showLoginButton}
        </form>
        {!isRegister && showForgotPassword}
        {!isRegister ? showRegister : showLogin}
      </div>
    </div>
  );
}

export default Login;
