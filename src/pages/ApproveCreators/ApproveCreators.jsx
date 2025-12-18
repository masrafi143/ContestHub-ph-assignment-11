import { useQuery } from "@tanstack/react-query";
import React from "react";

import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApproveCreators = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: creators = [] } = useQuery({
    queryKey: ["creators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/creators");
      return res.data;
    },
  });

  const updateCreatorStatus = (creator, status) => {
    const updateInfo = { status: status, email: creator.email };
    axiosSecure.patch(`/creators/${creator._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Creator status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (creator) => {
    updateCreatorStatus(creator, "approved");
  };

  const handleRejection = (creator) => {
    updateCreatorStatus(creator, "rejected");
  };

  return (
    <div className='w-11/12 mx-auto'>
      <h2 className="text-5xl">Creator Pending Approval: {creators.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{creator.name}</td>
                <td>{creator.email}</td>
                <td>{creator.district}</td>
                <td>
                  <p
                    className={`${
                      creator.status === "approved"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}
                  >
                    {creator.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(creator)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(creator)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveCreators;
