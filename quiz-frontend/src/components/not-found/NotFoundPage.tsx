import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
  return (
    <div className="page-not-found">
      <div className="container">
        <h1>404</h1>
        <p className="message">Oops! Page not found.</p>
        <p className="description">
          We couldn't find the page you were looking for. <br />
          Perhaps you'd like to explore our galaxy instead?
        </p>
        <a href="/home" className="home-btn">
          Home
        </a>
        <Link to="/home" className="home-btn">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
