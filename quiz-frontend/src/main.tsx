import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFoundPage from "./components/not-found/NotFoundPage";
import "./index.css";
import Login from "./components/login-register/Login";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import Home from "./components/home/Home";
import Quiz from "./components/Quiz/Quiz";
import Profile from "./components/profile/Profile";
import Score from "./components/score/Score";
import QuestionSet from "./components/questionset/QuestionSet";
import Question from "./components/question/Question";
import QSet from "./components/questionset copy/QSet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgot",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/home",
    element: <Question></Question>,
  },
  // {
  //   path: "/home",
  //   element: <Home></Home>,
  // },
  {
    path: "/quiz",
    element: <Quiz></Quiz>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/score",
    element: <Score></Score>,
  },
  {
    path: "/questionset",
    element: <QuestionSet></QuestionSet>,
  },
  {
    path: "/qset",
    element: <QSet></QSet>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
