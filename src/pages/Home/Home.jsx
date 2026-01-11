import React from "react";
import Banner from "./Banner";
import PopularContest from "./PopularContest";
import Winner from "./Winner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Statistics from "./Statistics";
import ContactUs from "./ContactUs";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { dark } = useAuth();

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${
          dark
            ? "bg-gradient-to-br from-[#0b132b] via-[#1a1f3d] to-[#2d1b69]"
            : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
        }`}
    >
      <Banner />
      <PopularContest />
      <Winner />
      <Features />
      <Statistics />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
