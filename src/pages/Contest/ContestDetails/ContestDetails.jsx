import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { dark, user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submission, setSubmission] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch contest details
  const { data: contest, isLoading, refetch } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  // Handle Stripe success session
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then(() => refetch());
    }
  }, [axiosSecure, refetch]);

  // Fetch user's payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const hasPaid = payments.some(
    (p) => p.contestId === id && p.paymentStatus === "paid"
  );

  // Handle payment
  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      email: user.email,
      name: contest.name,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  // Handle task submission
  const handleTaskSubmit = async () => {
    if (!submission.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Empty Submission",
        text: "Please provide task details or links.",
      });
    }

    setSubmitting(true);

    try {
      // POST request to backend
      await axiosSecure.post(`/contests/${id}/submit-task`, {
        contestId: id,       
        contestName: contest.name,       
        name: user.name,       
        userEmail: user.email,       
        taskSubmission: submission, 
        declaredWinner: false,
      });

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your task has been submitted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setSubmission("");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!contest) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Contest not found</div>;

  const bgClass = dark ? "bg-[#0b132b]" : "bg-white";
  const cardBgClass = dark ? "bg-[#1a1f3d]" : "bg-base-200";
  const mainTextClass = dark ? "text-gray-200" : "text-gray-800";
  const headingClass = dark ? "text-cyan-400" : "text-indigo-600";
  const subHeadingClass = dark ? "text-cyan-300" : "text-gray-700";

  return (
    <div className={`min-h-screen w-11/12 mx-auto py-10 transition-colors ${bgClass} ${mainTextClass}`}>
      <h1 className={`text-3xl md:text-5xl font-bold text-center mb-10 ${headingClass}`}>{contest.name}</h1>

      <div className="flex justify-center mb-10">
        <img src={contest.image} alt={contest.name} className="rounded-xl shadow-2xl w-full max-w-4xl object-cover" />
      </div>

      <div className={`p-6 md:p-10 rounded-xl shadow-lg transition-colors ${cardBgClass}`}>
        <p className="text-xl font-semibold mb-4">Participants: <span className="text-cyan-400">{contest.participants || 0}</span></p>
        <p className="text-xl font-semibold mb-6">Prize Money: <span className="text-green-400">${contest.prize}</span></p>
        <h2 className={`text-2xl font-bold mb-3 ${headingClass}`}>Contest Description</h2>
        <p className="text-lg leading-relaxed mb-8">{contest.description}</p>

        <h2 className={`text-2xl font-bold mb-3 ${headingClass}`}>Task Instructions</h2>
        <p className="text-lg leading-relaxed whitespace-pre-line">{contest.instructions}</p>

        <p className={`mt-10 text-lg font-semibold ${subHeadingClass}`}>Deadline: <span className="text-red-400 font-bold">{new Date(contest.deadline).toLocaleString()}</span></p>
        <p className={`mt-2 text-lg font-semibold ${subHeadingClass}`}>Contest Type: <span className="text-blue-400">{contest.type}</span></p>
        <p className={`text-xl font-semibold mb-6 ${subHeadingClass}`}>Price: <span className="text-red-400">${contest.price}</span></p>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          {hasPaid ? (
            <button onClick={() => setIsModalOpen(true)} className={`btn w-full md:w-auto px-10 text-lg ${dark ? "bg-green-500 hover:bg-green-600 text-gray-900" : "btn-success"}`}>
              Submit Task
            </button>
          ) : (
            <button onClick={handlePayment} className={`btn w-full md:w-auto px-10 text-lg ${dark ? "bg-cyan-500 hover:bg-cyan-600 text-gray-900" : "btn-primary"}`}>
              Register Contest
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1a1f3d] p-6 rounded-lg w-11/12 max-w-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Submit Your Task</h3>
            <textarea
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Provide task links or necessary details..."
              className="w-full p-3 rounded-md mb-4 bg-gray-100 dark:bg-[#0f1225] text-gray-800 dark:text-gray-200 resize-none h-32"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
              <button onClick={handleTaskSubmit} className="btn btn-success" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
