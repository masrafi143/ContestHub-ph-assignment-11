import { createBrowserRouter } from "react-router";
import { Component } from "react";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Error404 from "../Error404/Error404";
import AboutContest from "../pages/AboutContest/AboutContest";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import AddContest from "../pages/Contest/AddContest/AddContest";
import MyCreatedContests from "../pages/Contest/MyContest/MyCreatedContests";
import EditContest from "../pages/Contest/EditContest/EditContest";
import AdminManageContests from "../pages/Contest/ManageContest/ManageContest";

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
      {
        path: 'add-contest',
        Component: AddContest
      },
      {
        path: 'my-contests',
        Component: MyCreatedContests
      },
      {
        path: 'edit-contest/:id',
        Component: EditContest
      },
      {
        path: 'manage-contests',
        Component: AdminManageContests
      }
    ],
  },
  {
    path: "*",
    Component: Error404
  }
]);
