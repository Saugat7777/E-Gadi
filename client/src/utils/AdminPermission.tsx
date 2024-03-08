import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/userDataAPI";

interface RolePermission {
  children: React.ReactNode;
  requiredRole: string;
  loggedUserData: any;
}

const RolePermission = (props: RolePermission) => {
  const { children, requiredRole, loggedUserData } = props;

  return loggedUserData ? (
    loggedUserData.role === requiredRole ? (
      children
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Spin spinning={true} />
  );
};

export default RolePermission;
