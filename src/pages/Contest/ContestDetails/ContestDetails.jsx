import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch Contest Details
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });
  console.log(contest?.price);

  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      email: contest.email,
      name: contest.name,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
    // window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Contest not found
      </div>
    );
  }

  return (
    <div className="min-h-screen w-11/12 mx-auto py-10 dark:bg-gray-900 dark:text-white">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-primary mb-10">
        {contest.name}
      </h1>

      {/* Banner Image */}
      <div className="flex justify-center mb-10">
        <img
          src={contest.image}
          alt={contest.name}
          className="rounded-xl shadow-2xl w-full max-w-4xl object-cover"
        />
      </div>

      {/* Contest Info */}
      <div className="bg-base-200 dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-lg">
        {/* Participants Count */}
        <p className="text-xl font-semibold mb-4">
          Participants:{" "}
          <span className="text-primary">{contest.participants || 0}</span>
        </p>

        {/* Prize Money */}
        <p className="text-xl font-semibold mb-6">
          Prize Money: <span className="text-green-500">${contest.prize}</span>
        </p>

        {/* Description */}
        <h2 className="text-2xl font-bold mb-3 text-primary">
          Contest Description
        </h2>
        <p className="text-lg leading-relaxed mb-8">{contest.description}</p>

        {/* Task Details */}
        <h2 className="text-2xl font-bold mb-3 text-primary">
          Task Instructions
        </h2>
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {contest.instructions}
        </p>

        {/* Deadline */}
        <p className="mt-10 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Deadline:{" "}
          <span className="text-red-500 font-bold">
            {new Date(contest.deadline).toLocaleString()}
          </span>
        </p>

        {/* Contest Type */}
        <p className="mt-2 text-lg font-semibold">
          Contest Type: <span className="text-blue-500">{contest.type}</span>
        </p>

        {/* Price Money */}
        <p className="text-xl font-semibold mb-6">
          Price: <span className="text-red-500">${contest?.price}</span>
        </p>

        {/* Join Button */}
        <div className="mt-10">
          <button
            onClick={handlePayment}
            className="btn btn-primary w-full md:w-auto px-10 text-lg"
          >
            Register Contest
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
