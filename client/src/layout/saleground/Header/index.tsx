import { Avatar, Button, Col, Flex, Layout, Menu, Row, Tooltip } from "antd";

import { useState } from "react";

import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/carousel/logo.png";
import Login from "../../../component/organism/Login";
import {
  handleLogout,
  handleShowLoginModal,
} from "../../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store";

import { headerMenuItem } from "../../../utils/menuPath";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, navigatePath, loggedInUser } = useAppSelector(
    (store) => store.auth
  );
  const { pathname } = window.location;
  const currentPathName = pathname === "/" ? ["home"] : [pathname];
  const [activeMenu, setActiveMenu] = useState(currentPathName);
  return (
    <Layout.Header
      style={{
        background: "white",
        height: "4.7rem",
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Row justify={"space-between"} align={"middle"}>
        <Col span={6}>
          <Flex justify="flex-end">
            <Avatar size={70} src={logo} shape={"square"} />
          </Flex>
        </Col>
        <Col span={10}>
          <Menu
            mode="horizontal"
            items={headerMenuItem}
            selectedKeys={activeMenu}
            onSelect={({ selectedKeys, key }) => {
              setActiveMenu(selectedKeys);
              key === "home" ? navigate("") : navigate(key);
            }}
          />
        </Col>
        <Col>
          <Flex wrap="wrap" gap="small">
            <Tooltip arrow title={accessToken ? "Logout" : "Login"}>
              <Button
                type="primary"
                shape="circle"
                icon={<LoginOutlined rotate={accessToken ? 180 : 0} />}
                onClick={() => {
                  accessToken
                    ? dispatch(handleLogout())
                    : dispatch(handleShowLoginModal());
                }}
              />
            </Tooltip>
            {loggedInUser ? (
              <Button
                type="text"
                shape="round"
                onClick={() => {
                  navigate(navigatePath);
                }}
                loading={!navigatePath}
              >
                Dashboard
              </Button>
            ) : null}
          </Flex>
        </Col>
      </Row>
      <Login />
    </Layout.Header>
  );
};

export default Header;
