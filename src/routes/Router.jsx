import { createBrowserRouter } from "react-router";
import { Component } from "react";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
      }
    ],
  },
]);
