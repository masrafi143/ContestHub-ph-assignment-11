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
import AdminManageContests from "../pages/Contest/AdminManageContests/ManageContests";
import AdminManageUsers from "../pages/AdminManageUsers/AdminManageUsers";
import AllContests from "../pages/Contest/AllContests/AllContests";
import ContestDetails from "../pages/Contest/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Contest/ContestDetails/paymentSuccess";
import PaymentCancelled from "../pages/Contest/ContestDetails/paymentCancelled";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Creator from "../pages/ContestCreator/ApplyCreator";
import ApproveCreators from "../pages/ApproveCreators/ApproveCreators";
import UsersManagement from "../pages/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import CreatorRoute from "./CreatorRoute";
import ApplyCreator from "../pages/ContestCreator/ApplyCreator";
import ManageContests from "../pages/Contest/AdminManageContests/ManageContests";
import MyProfile from "../pages/MyProfile/MyProfile";
import SubmittedTasks from "../pages/SubmittedTasks/SubmittedTasks";

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
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "about",
        Component: AboutContest,
      },
      {
        path: "how-it-works",
        Component: HowItWorks,
      },
      {
        path: "all-contests",
        Component: AllContests,
      },
      {
        path: "contests/:id",
        Component: ContestDetails,
      },
      {
        path: "contests/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "contests/payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
  {
    path: "dashboard",
    Component: Dashboard,
    children: [
      {
        path:'profile',
        Component: MyProfile,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <AdminManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "apply-creator",
        // Component: Creator,
        element: (
          <CreatorRoute>
            <ApplyCreator />
          </CreatorRoute>
        ),
      },
      {
        path: "add-contest",
        // Component: AddContest,
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "submitted-tasks",
        // Component: AddContest,
        element: (
          <CreatorRoute>
            <SubmittedTasks />
          </CreatorRoute>
        ),
      },
      {
        path: "my-contests",
        // Component: MyCreatedContests,
        element: (
          <CreatorRoute>
            <MyCreatedContests />
          </CreatorRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        Component: EditContest,
      },
      {
        path: "manage-contests",
        // Component: AdminManageContests
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        // Component: AdminManageUsers
        element: (
          <AdminRoute>
            <AdminManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "approve-creators",
        element: (
          <AdminRoute>
            <ApproveCreators />
          </AdminRoute>
        ),
      },
    ],
  },
]);
