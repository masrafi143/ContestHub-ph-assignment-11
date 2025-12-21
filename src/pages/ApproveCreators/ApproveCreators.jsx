import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ApproveCreators = () => {
  const { dark } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: creators = [] } = useQuery({
    queryKey: ["creators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/creators");
      return res.data;
    },
  });

  const updateCreatorStatus = (creator, status) => {
    axiosSecure
      .patch(`/creators/${creator._id}`, { status, email: creator.email })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Creator status set to ${status}`,
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
  };

  const tableHeaderBg = dark ? "bg-[#111c44] text-gray-200" : "bg-base-200 text-gray-900";
  const rowHoverBg = dark ? "hover:bg-[#1e2a5a]" : "hover:bg-base-300";
  const rowBg = dark ? "bg-[#0b132b] text-gray-100" : "bg-white text-gray-900";

  return (
    <div className="w-11/12 mx-auto py-6">
      <h2 className={`text-3xl font-semibold mb-6 ${dark ? "text-gray-100" : "text-gray-900"}`}>
        Creator Pending Approval: {creators.length}
      </h2>

      <div className={`overflow-x-auto rounded-lg border ${dark ? "border-gray-700" : "border-base-300"}`}>
        <table className="min-w-full text-sm">
          {/* ===== TABLE HEAD ===== */}
          <thead className={`${tableHeaderBg}`}>
            <tr className="text-left">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          {/* ===== TABLE BODY ===== */}
          <tbody>
            {creators.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 opacity-60">
                  No pending creators found
                </td>
              </tr>
            )}

            {creators.map((creator, index) => (
              <tr
                key={creator._id}
                className={`border-t ${dark ? "border-gray-700" : "border-base-300"} ${rowBg} ${rowHoverBg} transition-colors`}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{creator.name}</td>
                <td className="px-4 py-3">{creator.email}</td>
                <td className="px-4 py-3">{creator.district}</td>

                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      creator.status === "approved"
                        ? dark
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-800"
                        : dark
                        ? "bg-red-900 text-red-300"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {creator.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateCreatorStatus(creator, "approved")}
                      className="btn btn-xs bg-green-600 hover:bg-green-700 text-white border-none"
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      onClick={() => updateCreatorStatus(creator, "rejected")}
                      className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                    >
                      <IoPersonRemoveSharp />
                    </button>

                    <button className="btn btn-xs bg-red-600 hover:bg-red-700 text-white border-none">
                      <FaTrashCan />
                    </button>
                  </div>
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
