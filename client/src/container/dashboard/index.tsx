import {
  CarOutlined,
  TagOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Flex, Grid, Statistic } from "antd";
import { useEffect, useMemo } from "react";
import { handleBreadCumbs } from "../../features/globalSlice";

import { useGetNewCarsQuery } from "../../services/newCarAPI";
import { useGetUsedCarsQuery } from "../../services/usedCar";
import { useGetUsersQuery } from "../../services/user";
import { useAppDispatch } from "../../store";

const Dashboard = () => {
  const screen = Grid.useBreakpoint();
  const dispatch = useAppDispatch();

  const { data: newCars, isLoading: newCarLoading } = useGetNewCarsQuery();
  const { data: usedCars, isLoading: usedCarLoading } = useGetUsedCarsQuery();
  const { data: users, isLoading: userLoading } = useGetUsersQuery();

  const loading = useMemo(() => {
    if (newCarLoading && usedCarLoading && userLoading) return true;
    return false;
  }, [newCarLoading, usedCarLoading, userLoading]);

  const totalCount = useMemo(() => {
    if (!newCars || !usedCars || !users) return null;
    const activeUsers = users?.filter((user: any) => user?.verified === true);
    return {
      newCar: newCars?.length < 10 ? `0${newCars?.length}` : newCars?.length,
      usedCar:
        usedCars?.length < 10 ? `0${usedCars?.length}` : usedCars?.length,
      user: users?.length < 10 ? `0${users?.length}` : users?.length,
      activeUser:
        activeUsers?.length < 10
          ? `0${activeUsers?.length}`
          : activeUsers?.length,
    };
  }, [newCars, usedCars, users]);

  useEffect(() => {
    dispatch(handleBreadCumbs([{ title: "Dashboard" }]));
  }, []);

  return (
    <Flex wrap="wrap" gap={screen?.xs ? 10 : 50}>
      <Card
        style={{
          flex: "1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <Flex align="center" justify="space-between" gap={"large"}>
          <Statistic
            title="Total Users"
            value={totalCount?.user}
            loading={loading}
            prefix={<TeamOutlined style={{ marginRight: ".3rem" }} />}
          />
        </Flex>
      </Card>
      <Card
        style={{
          flex: "1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <Flex align="center" justify="space-between" gap={"large"}>
          <Statistic
            title="New Cars"
            value={totalCount?.newCar}
            loading={loading}
            prefix={<CarOutlined style={{ marginRight: ".3rem" }} />}
          />
        </Flex>
      </Card>{" "}
      <Card
        style={{
          flex: "1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <Flex align="center" justify="space-between" gap={"large"}>
          <Statistic
            title="Used Cars"
            value={totalCount?.usedCar}
            loading={loading}
            prefix={<TagOutlined style={{ marginRight: ".3rem" }} />}
          />
        </Flex>
      </Card>{" "}
      <Card
        style={{
          flex: "1",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <Flex align="center" justify="space-between" gap={"large"}>
          <Statistic
            title="Active Users"
            value={totalCount?.activeUser}
            loading={loading}
            prefix={<UserOutlined style={{ marginRight: ".3rem" }} />}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Dashboard;
