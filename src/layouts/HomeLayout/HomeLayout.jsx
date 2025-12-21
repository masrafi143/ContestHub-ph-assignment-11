import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";

const HomeLayout = () => {
  const { dark } = useAuth();

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${dark ? "bg-[#0b132b] text-gray-100" : "bg-base-100 text-gray-900"}`}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
