import Routing from "./routes";
import { useGetCurrentUserQuery } from "./services/userDataAPI";
import { useAppSelector } from "./store";

function App() {
  useGetCurrentUserQuery();
  const { loggedInUser } = useAppSelector((state) => state.auth);

  return (
    <>
      <Routing loggedInUserData={loggedInUser} />
    </>
  );
}

export default App;
