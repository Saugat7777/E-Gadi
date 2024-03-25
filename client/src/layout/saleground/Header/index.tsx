import {
  Avatar,
  Button,
  Col,
  Flex,
  Grid,
  Layout,
  Menu,
  Row,
  Tooltip,
} from "antd";

import { useEffect, useState } from "react";

import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/carousel/logo.png";
import Login from "../../../component/organism/Login";
import {
  handelNavigatePath,
  handleLogout,
  handleShowLoginModal,
} from "../../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store";

import { headerMenuItem } from "../../../utils/menuPath";

const Header = () => {
  const screen = Grid.useBreakpoint();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, navigatePath, loggedInUser } = useAppSelector(
    (store) => store.auth
  );
  const { pathname } = window.location;
  const currentPathName = pathname === "/" ? ["home"] : [pathname];
  const [activeMenu, setActiveMenu] = useState(currentPathName);

  useEffect(() => {
    dispatch(handelNavigatePath());
  }, [accessToken, loggedInUser]);

  return (
    <Layout.Header
      style={{
        background: "white",
        height: "4.7rem",
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Row justify={"center"} align={"middle"}>
        <Col span={20}>
          <Row align={"middle"} justify={"space-between"}>
            <Col span={9}>
              <Flex align="center" style={{ width: "100%" }}>
                <Avatar
                  size={screen?.xs ? 55 : 70}
                  src={logo}
                  shape={"square"}
                />
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
            <Col
              // xs={{ span: 8 }}
              // sm={{ span: 5 }}
              // md={{ span: 5 }}
              // lg={{ span: 5 }}
              span={5}
            >
              <Flex gap="1" align="center" justify={screen.xs ? "" : "end"}>
                <Tooltip arrow title={accessToken ? "Logout" : "Login"}>
                  <Button
                    type="primary"
                    shape="circle"
                    size={screen.xs && !screen.md ? "small" : "middle"}
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
                    size={screen.xs && !screen.md ? "small" : "middle"}
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
        </Col>
      </Row>
      <Login />
    </Layout.Header>
  );
};

export default Header;
