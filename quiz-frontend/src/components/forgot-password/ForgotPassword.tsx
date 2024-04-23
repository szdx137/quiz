import React, { useState } from "react";
import "./ForgotPassword.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="container">
        <h1>WELCOME TO QUIZ GAME</h1>
        <h2>Recover Password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
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
          <button type="submit" className="submit-btn" disabled={isSubmitted}>
            Recover
          </button>
        </form>

        {isSubmitted && (
          <p>Recovery password will be sent to you email. Use it to login.</p>
        )}
        <div className="recover">
          <p>
            <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
