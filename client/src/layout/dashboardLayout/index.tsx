import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Breadcrumb,
  Button,
  Flex,
  Grid,
  Layout,
  Menu,
  Popconfirm,
  Typography,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/carousel/logo.png";
import { handleLogout } from "../../features/authSlice";
import { useGetCurrentUserQuery } from "../../services/userDataAPI";
import { useAppDispatch, useAppSelector } from "../../store";
import { sidebarMenuItem } from "../../utils/menuPath";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const { loggedInUser } = useAppSelector((state) => state.auth);
  useGetCurrentUserQuery();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const screen = Grid.useBreakpoint();

  const dispatch = useAppDispatch();
  const { breadCumbs } = useAppSelector((state) => state.global);
  const navigate: NavigateFunction = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    screen?.xs ? setCollapsed(true) : null;
  }, [screen]);

  useEffect(() => {}, [loggedInUser]);

  const { pathname } = window.location;
  const currentPathName = [pathname];
  const [activeMenu, setActiveMenu] = useState(currentPathName);

  const items: MenuProps["items"] = [
    {
      label: (
        <Avatar
          size={40}
          icon={<UserOutlined />}
          src={loggedInUser ? (loggedInUser as any)?.imageURL : null}
        />
      ),
      key: "SubMenu",
      children: [
        {
          label: <div onClick={() => navigate("/")}>Leave</div>,
          key: "leave",
        },
        {
          label: <div onClick={() => dispatch(handleLogout())}>Logout</div>,
          key: "logout",
        },
      ],
    },
  ];

  const validatedMenuItems: any = sidebarMenuItem.filter(
    (menu) => menu.guard === (loggedInUser as any)?.role
  );

  validatedMenuItems.push({
    label: (
      <Popconfirm
        placement="rightTop"
        title={"Logout"}
        description={"Are you sure want to log out?"}
        okText="Yes"
        cancelText="No"
        onConfirm={() => dispatch(handleLogout())}
      >
        Logout
      </Popconfirm>
    ),
    icon: collapsed ? (
      <Popconfirm
        placement="rightTop"
        title={"Logout"}
        description={"Are you sure want to log out?"}
        okText="Yes"
        cancelText="No"
        onConfirm={() => dispatch(handleLogout())}
      >
        <LogoutOutlined rotate={180} />
      </Popconfirm>
    ) : (
      <LogoutOutlined rotate={180} />
    ),
    key: "logout",
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          height: "100vh",
          position: "sticky",
          background: "#eff0f3",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: "100",
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Flex style={{ marginBottom: "1rem" }}>
          <img src={logo} style={{ height: "5rem" }} />
        </Flex>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{
            marginTop: "1rem",
            background: "#eff0f3",
          }}
          items={validatedMenuItems}
          selectedKeys={activeMenu}
          onSelect={({ selectedKeys, key }) => {
            setActiveMenu(selectedKeys);
            if (key !== "logout") return navigate(key);
          }}
        />
      </Sider>
      <Layout style={{ background: "white" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            height: "4.5rem",
            padding: 0,
            background: "white",
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: "1",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            disabled={screen?.xs ? true : false}
          />

          <Menu mode="horizontal" items={items} />
        </Header>
        <Content style={{ margin: "0 16px", background: "white" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadCumbs} />

          <div
            style={{
              padding: "1rem 0 0 0",
              background: "white",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: "10",
            background: "white",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <Flex align="center" justify="center" style={{}}>
            <Typography.Text
              style={{ fontSize: screen?.xs ? ".6rem" : ".8rem" }}
            >
              E-Gadi ©{new Date().getFullYear()} Created by ConfuseSuon
            </Typography.Text>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
