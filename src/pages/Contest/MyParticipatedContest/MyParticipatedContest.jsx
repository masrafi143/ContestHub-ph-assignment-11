// MyParticipatedContests.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; 

const MyParticipatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: participated = [], isLoading } = useQuery({
    queryKey: ["my-participated", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-participated-contests?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  if (participated.length === 0) return <div className="text-center py-20 text-2xl">No participated contests yet!</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">My Participated Contests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {participated.map((contest) => (
          <div key={contest._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <figure className="h-48">
              <img src={contest.image} alt={contest.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{contest.name}</h2>
              <p className="text-lg">Prize: <span className="font-bold text-green-600">${contest.prize}</span></p>
              <p>Deadline: <span className="font-semibold">{new Date(contest.deadline).toLocaleDateString()}</span></p>

              <div className="flex justify-between items-center mt-4">
                <div className="badge badge-success badge-lg">Paid</div>
                <span className="text-sm text-gray-500">
                  {Math.ceil((new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
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