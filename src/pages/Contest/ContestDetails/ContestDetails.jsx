import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ContestDetails = () => {
  const { dark } = useAuth();
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

  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      email: contest.email,
      name: contest.name,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
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

  // Conditional classes for dark/light mode
  const bgClass = dark ? "bg-[#0b132b]" : "bg-white";
  const cardBgClass = dark ? "bg-[#1a1f3d]" : "bg-base-200";
  const mainTextClass = dark ? "text-gray-200" : "text-gray-800";
  const headingClass = dark ? "text-cyan-400" : "text-indigo-600";
  const subHeadingClass = dark ? "text-cyan-300" : "text-gray-700";

  return (
    <div className={`min-h-screen w-11/12 mx-auto py-10 transition-colors ${bgClass} ${mainTextClass}`}>
      {/* Title */}
      <h1 className={`text-3xl md:text-5xl font-bold text-center mb-10 ${headingClass}`}>
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
      <div className={`p-6 md:p-10 rounded-xl shadow-lg transition-colors ${cardBgClass}`}>
        {/* Participants Count */}
        <p className={`text-xl font-semibold mb-4`}>
          Participants: <span className="text-cyan-400">{contest.participants || 0}</span>
        </p>

        {/* Prize Money */}
        <p className={`text-xl font-semibold mb-6`}>
          Prize Money: <span className="text-green-400">${contest.prize}</span>
        </p>

        {/* Description */}
        <h2 className={`text-2xl font-bold mb-3 ${headingClass}`}>Contest Description</h2>
        <p className="text-lg leading-relaxed mb-8">{contest.description}</p>

        {/* Task Details */}
        <h2 className={`text-2xl font-bold mb-3 ${headingClass}`}>Task Instructions</h2>
        <p className="text-lg leading-relaxed whitespace-pre-line">{contest.instructions}</p>

        {/* Deadline */}
        <p className={`mt-10 text-lg font-semibold ${subHeadingClass}`}>
          Deadline: <span className="text-red-400 font-bold">{new Date(contest.deadline).toLocaleString()}</span>
        </p>

        {/* Contest Type */}
        <p className={`mt-2 text-lg font-semibold ${subHeadingClass}`}>
          Contest Type: <span className="text-blue-400">{contest.type}</span>
        </p>

        {/* Price */}
        <p className={`text-xl font-semibold mb-6 ${subHeadingClass}`}>
          Price: <span className="text-red-400">${contest?.price}</span>
        </p>

        {/* Join Button */}
        <div className="mt-10">
          <button
            onClick={handlePayment}
            className={`btn w-full md:w-auto px-10 text-lg ${
              dark ? "bg-cyan-500 hover:bg-cyan-600 text-gray-900" : "btn-primary"
            }`}
          >
            Register Contest
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
