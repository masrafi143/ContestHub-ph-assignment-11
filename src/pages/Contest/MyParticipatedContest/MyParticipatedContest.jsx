import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyParticipatedContests = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-participated", dbUser?.email],
    enabled: !!dbUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${dbUser.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (payments.length === 0)
    return (
      <div className="text-center py-20 text-2xl text-gray-500">
        No participated contests yet!
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Participated Contests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {payments.map((pay) => (
          <div
            key={pay._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <figure className="h-48">
              <img
                src={pay.contestImage}
                alt={pay.contestName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{pay.contestName}</h2>

              <p className="text-lg">
                Prize:{" "}
                <span className="font-bold text-green-600">
                  ${pay.prize}
                </span>
              </p>

              <p>
                Deadline:{" "}
                <span className="font-semibold">
                  {new Date(pay.deadline).toLocaleDateString()}
                </span>
              </p>

              <div className="flex justify-between items-center mt-4">
                <div className="badge badge-success badge-lg">Paid</div>
                <span className="text-sm text-gray-500">
                  Paid on {new Date(pay.paidAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParticipatedContests;
