import { useRoutes } from "react-router-dom";
import PageNotFound from "../container/PageNotFound";
import DashboardRoutes from "./Dashboard";
import MainRoutes from "./MainRoute";

export default function Routing(props: any): React.ReactElement | null {
  const routes: any = [MainRoutes, DashboardRoutes(props.loggedInUserData)];
  routes.push({ path: "*", element: <PageNotFound /> });
  return useRoutes(routes);
}
