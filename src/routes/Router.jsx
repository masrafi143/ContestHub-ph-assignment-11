import { createBrowserRouter } from "react-router";
import { Component } from "react";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Error404 from "../Error404/Error404";
import AboutContest from "../pages/AboutContest/AboutContest";
import HowItWorks from "../pages/HowItWorks/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'about',
        Component: AboutContest
      },
      {
        path: 'how-it-works',
        Component: HowItWorks
      },
    ],
  },
  {
    path: "*",
    Component: Error404
  }
]);
