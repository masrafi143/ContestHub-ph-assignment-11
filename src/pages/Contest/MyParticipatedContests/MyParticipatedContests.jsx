import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParticipatedContests = () => {
  const { user, dark } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-participated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const { data: contests = [] } = useQuery({
    queryKey: ["contest-deadlines"],
    enabled: payments.length > 0,
    queryFn: async () => {
      const ids = payments.map(p => p.contestId);
      const res = await axiosSecure.post("/contest/by-ids", { ids });
      return res.data;
    }
  });

  const deadlineMap = {};
  contests.forEach(c => {
    deadlineMap[c._id] = c.deadline;
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className={`w-11/12 mx-auto mt-10 ${dark ? "text-gray-200" : "text-gray-800"}`}>
      <h2 className="text-3xl font-bold mb-6">My Participated Contests</h2>

      <div className={`overflow-x-auto rounded-xl shadow ${dark ? "bg-[#111c44]" : "bg-base-100"}`}>
        <table className="table">
          <thead className={dark ? "bg-[#1e2a5a] text-gray-200" : "bg-base-200"}>
            <tr>
              <th>#</th>
              <th>Contest</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>Deadline</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p._id} className={dark ? "hover:bg-[#1e2a5a]" : "hover:bg-base-200"}>
                <td>{idx + 1}</td>
                <td>{p.contestName}</td>
                <td>${p.amount}</td>
                <td>
                  <span className="badge badge-success">{p.paymentStatus}</span>
                </td>
                <td className="text-xs">{p.transactionId}</td>
                <td className="text-sm">
                  {deadlineMap[p.contestId]
                    ? new Date(deadlineMap[p.contestId]).toLocaleString()
                    : "—"}
                </td>
                <td className="text-sm">{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!payments.length && (
          <p className="text-center text-gray-400 py-10">
            You have not participated in any contests yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyParticipatedContests;
