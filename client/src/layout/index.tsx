import { useGetCurrentUserQuery } from "../services/userDataAPI";
import Salesground from "./saleground";

const AppLayout: React.FC = () => {
  useGetCurrentUserQuery();
  return <Salesground />;
};

export default AppLayout;
