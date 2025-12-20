import React from "react";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden";

const CreatorRoute = ({ children }) => {
  const { role } = useRole();

  if (role !== "creator") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default CreatorRoute;
