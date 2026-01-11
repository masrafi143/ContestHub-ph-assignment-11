import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const SubmittedTasks = () => {
  const { contestId } = useParams();
  const { dbUser, dark } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contestId) return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://contest-hub-server-gold.vercel.app/submitted-tasks?contestId=${contestId}`
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [contestId]);

  const handleDeclareWinner = async (id) => {
    try {
      const res = await axios.patch(
        `https://contest-hub-server-gold.vercel.app/submitted-tasks/${id}/winner`
      );

      if (res.data.success) {
        setSubmissions((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, declaredWinner: true } : s
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to declare winner");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!submissions.length)
    return <div className="p-10 text-center">No submissions yet.</div>;

  return (
    <div className={`w-full ${dark ? "text-gray-100" : "text-gray-900"}`}>
      <h2 className="text-2xl font-bold mb-6">Submitted Tasks</h2>

      <div className="space-y-4">
        {submissions.map((s) => (
          <div
            key={s._id}
            className={`p-4 rounded-lg shadow-md ${
              dark ? "bg-[#1a1f3d]" : "bg-white"
            }`}
          >
            <p>
              <span className="font-semibold">Participant:</span>{" "}
              {s.participantName} ({s.participantEmail})
            </p>

            <p className="mt-2 whitespace-pre-line">
              <span className="font-semibold">Submission:</span> {s.submission}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Contest:</span> {s.contestName}
            </p>

            {s.declaredWinner ? (
              <p className="mt-2 text-green-400 font-semibold">
                Winner Declared
              </p>
            ) : (
              <button
                onClick={() => handleDeclareWinner(s._id)}
                className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
              >
                Declare Winner
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedTasks;
