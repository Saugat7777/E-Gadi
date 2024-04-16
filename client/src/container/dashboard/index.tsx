import {
  CarOutlined,
  TagOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Flex, Grid, Row, Statistic } from "antd";
import { Fragment, useEffect, useMemo } from "react";
import { handleBreadCumbs } from "../../features/globalSlice";

import NewCarCard from "../../component/organism/NewCarCard";
import UsedCarCard from "../../component/organism/UsedCarCard";
import UserCard from "../../component/organism/UserCard";
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
    <Fragment>
      <Card>
        <Divider orientationMargin={0} orientation="left">
          Statisctic
        </Divider>
        <Row gutter={[50, 10]} wrap>
          <Col span={screen?.xs ? 12 : 6}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                title="Total Users"
                value={totalCount?.user}
                loading={loading}
                prefix={
                  <TeamOutlined
                    style={{ marginRight: ".3rem", color: "#fc8e3c" }}
                  />
                }
              />
            </div>
          </Col>
          <Col span={screen?.xs ? 12 : 6}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                title="New Cars"
                value={totalCount?.newCar}
                loading={loading}
                prefix={
                  <CarOutlined
                    style={{ marginRight: ".3rem", color: "#fc8e3c" }}
                  />
                }
              />
            </div>
          </Col>
          <Col span={screen?.xs ? 12 : 6}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                title="Used Cars"
                value={totalCount?.usedCar}
                loading={loading}
                prefix={
                  <TagOutlined
                    style={{ marginRight: ".3rem", color: "#fc8e3c" }}
                  />
                }
              />
            </div>
          </Col>
          <Col span={screen?.xs ? 12 : 6}>
            <div
              style={{
                padding: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                borderRadius: "10px",
              }}
            >
              <Statistic
                title="Active Users"
                value={totalCount?.activeUser}
                loading={loading}
                prefix={
                  <UserOutlined
                    style={{ marginRight: ".3rem", color: "#fc8e3c" }}
                  />
                }
              />
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={screen?.xs ? 24 : 12} style={{ marginTop: "3rem" }}>
            <Card
              hoverable
              title={
                <span>
                  Used Car{" "}
                  <span style={{ fontWeight: "normal" }}>(Current Year)</span>
                </span>
              }
            >
              <Row>
                <Col span={24}>
                  <UsedCarCard usedCarData={usedCars ? usedCars : null} />
                </Col>
              </Row>
            </Card>
          </Col>{" "}
          <Col span={screen?.xs ? 24 : 12} style={{ marginTop: "3rem" }}>
            <Card
              hoverable
              title={
                <span>
                  User{" "}
                  <span style={{ fontWeight: "normal" }}>(Current Year)</span>
                </span>
              }
            >
              <Row>
                <Col span={24}>
                  <UserCard userData={users ? users : null} />
                </Col>
              </Row>
            </Card>
          </Col>{" "}
          <Col span={screen?.xs ? 24 : 12} style={{ marginTop: "3rem" }}>
            <Card
              hoverable
              title={
                <span>
                  New Car{" "}
                  <span style={{ fontWeight: "normal" }}>(Current Year)</span>
                </span>
              }
            >
              <Row>
                <Col span={24}>
                  <NewCarCard newCarData={newCars ? newCars : null} />
                </Col>
              </Row>
            </Card>
          </Col>{" "}
        </Row>
      </Card>
    </Fragment>
  );
};

export default Dashboard;
