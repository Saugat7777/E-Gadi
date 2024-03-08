import Dashboard from "../container/dashboard";
import NewElectricCar from "../container/dashboard/new-electric-car";
import AddNewElectricCar from "../container/dashboard/new-electric-car/AddNewElectricCar";
import EditNewElectricCar from "../container/dashboard/new-electric-car/EditNewElectricCar";
import Profile from "../container/dashboard/profile";
import SellYourCar from "../container/dashboard/sell-your-car";
import AddYourCar from "../container/dashboard/sell-your-car/AddYourCar";
import EditYourCar from "../container/dashboard/sell-your-car/EditYourCar";
import UsedCars from "../container/dashboard/used-cars";
import Users from "../container/dashboard/users";

import DashboardLayout from "../layout/dashboardLayout";
import RolePermission from "../utils/AdminPermission";

import ProtectedRoute from "./ProtectedRoute";

const DashboardRoutes = (loggedInUserData: any) => ({
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      {" "}
      <DashboardLayout />{" "}
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <Dashboard />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/new-electric-car",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <NewElectricCar />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/new-electric-car/add",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <AddNewElectricCar />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/new-electric-car/edit",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <EditNewElectricCar />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/users",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <Users />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/used-cars",
      element: (
        <RolePermission
          requiredRole={"admin"}
          loggedUserData={loggedInUserData}
        >
          <UsedCars />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/profile",
      element: (
        <RolePermission requiredRole={"user"} loggedUserData={loggedInUserData}>
          <Profile />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/sell-your-car",
      element: (
        <RolePermission requiredRole={"user"} loggedUserData={loggedInUserData}>
          <SellYourCar />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/sell-your-car/add",
      element: (
        <RolePermission requiredRole={"user"} loggedUserData={loggedInUserData}>
          <AddYourCar />
        </RolePermission>
      ),
    },
    {
      path: "/dashboard/sell-your-car/edit",
      element: (
        <RolePermission requiredRole={"user"} loggedUserData={loggedInUserData}>
          <EditYourCar />
        </RolePermission>
      ),
    },
  ],
});

export default DashboardRoutes;
