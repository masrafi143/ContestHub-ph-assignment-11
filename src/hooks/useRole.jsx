import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", dbUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${dbUser.email}/role`);
        console.log("use role",res.data?.role);
      return res.data?.role || "user";
    },
  });

  return { role, roleLoading };
};

export default useRole;
