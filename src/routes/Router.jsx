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
import AdminManageContests from "../pages/Contest/AdminManageContests/AdminManageContests";
import AdminManageUsers from "../pages/AdminManageUsers/AdminManageUsers";
import AllContests from "../pages/Contest/AllContests/AllContests";
import ContestDetails from "../pages/Contest/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Contest/ContestDetails/paymentSuccess";
import PaymentCancelled from "../pages/Contest/ContestDetails/paymentCancelled";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Creator from "../pages/ContestCreator/Creator";
import ApproveCreators from "../pages/ApproveCreators/ApproveCreators";


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
      },
      {
        path: 'manage-users',
        Component: AdminManageUsers
      },
      {
        path: 'all-contests',
        Component: AllContests
      },
      {
        path: 'contests/:id',
        Component: ContestDetails
      },
      {
        path: 'contests/payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'contests/payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'leaderboard',
        Component: Leaderboard
      },
      {
        path: 'creator',
        Component: Creator
      },
      {
        path: 'approve-creators',
        Component: ApproveCreators
      },
    ],
  },
  {
    path: "*",
    Component: Error404
  }
]);
