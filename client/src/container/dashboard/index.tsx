import { useEffect } from "react";
import { handleBreadCumbs } from "../../features/globalSlice";

import { useGetCurrentUserQuery } from "../../services/userDataAPI";
import { useAppDispatch, useAppSelector } from "../../store";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleBreadCumbs([{ title: "Dashboard" }]));
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
