import {
  Card,
  Col,
  Empty,
  Flex,
  Grid,
  Image,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";

import { Fragment, useEffect, useMemo, useState } from "react";
import cardDummyPic from "../../../assets/carousel/car2.jpg";
import firstCarousel from "../../../assets/carousel/futuristic-concept-art-electric-car-station.jpg";
import CsDivider from "../../../component/atom/Divider";
import {
  useGetCompareCarListQuery,
  usePostCompareCarIdentityMutation,
} from "../../../services/compareCarAPI";

const CompareCars = () => {
  const screen = Grid.useBreakpoint();
  const [firstCar, setFirstCar] = useState("");
  const [secondCar, setSecondCar] = useState("");
  const { data: compareCarList } = useGetCompareCarListQuery();

  const [
    postCompareCarIdentity,
    { data: comparedCarListData, isLoading: loading },
  ] = usePostCompareCarIdentityMutation();

  useEffect(() => {
    if (firstCar && secondCar) {
      postCompareCarIdentity({ firstCar, secondCar });
    }
  }, [firstCar, secondCar]);

  const firstCardData = useMemo(() => {
    if (!comparedCarListData) return null;
    return comparedCarListData?.filter(
      (list: any) => list?.identity === firstCar
    );
  }, [comparedCarListData]);

  const secondCardData = useMemo(() => {
    if (!comparedCarListData) return null;
    return comparedCarListData?.filter(
      (list: any) => list?.identity === secondCar
    );
  }, [comparedCarListData]);

  return (
    <Fragment>
      {/* Seciton 1 */}
      <Row justify={"center"}>
        <Col span={24} style={{ position: "relative" }}>
          <Row
            justify={"center"}
            style={{
              marginTop: "2rem",
              height: "20rem",
              width: "100%",
              position: "absolute",
              zIndex: "10",
            }}
          >
            <Col
              span={10}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography.Title
                style={{
                  color: "#fefbf7",
                  letterSpacing: ".1rem",
                  textAlign: "center",
                }}
                level={screen?.xs ? 2 : 1}
              >
                Compare Cars
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  color: "#fefbf7",
                  letterSpacing: ".1rem",
                  textAlign: "center",
                }}
              >
                Confused, let us help you decide what car is best suited for you
                and your family.
              </Typography.Paragraph>
            </Col>
          </Row>
          <Col span={24} style={{ background: "black" }}>
            <img
              src={firstCarousel}
              style={{
                width: "100%",
                height: "20rem",
                objectFit: "cover",
                opacity: ".6",
              }}
            />
          </Col>
        </Col>
      </Row>

      {/* Seciton 2 */}
      <Row align={"middle"} justify={"center"}>
        <Col span={20}>
          <CsDivider title="Compare Cars" dividerSize={5} />
        </Col>
        <Col span={20} style={{ marginTop: "1rem" }}>
          <Flex justify="center" wrap="wrap" gap={"large"}>
            <Card
              hoverable
              style={{
                width: 350,
                border: `1px solid ${firstCar ? "#fc8e3c" : "none"}`,
              }}
              cover={
                !firstCardData && loading ? (
                  <Skeleton.Image active />
                ) : (
                  <img
                    alt="carImage"
                    src={
                      firstCardData
                        ? firstCardData[0].imageURL[0]
                        : cardDummyPic
                    }
                  />
                )
              }
            >
              {!firstCardData && loading ? (
                <Skeleton.Input active style={{ marginTop: "7rem" }} />
              ) : (
                <Select
                  size="large"
                  style={{ width: "100%", color: "black" }}
                  showSearch
                  placeholder="Select car brand model"
                  optionFilterProp="children"
                  value={firstCar}
                  onChange={(value) => setFirstCar(value)}
                  options={
                    compareCarList
                      ? compareCarList?.map(
                          (list: {
                            id: string;
                            car: string;
                            identity: string;
                          }) => ({
                            value: list?.identity,
                            label: list?.car,
                          })
                        )
                      : []
                  }
                />
              )}
            </Card>
            <Card
              hoverable
              style={{
                width: 350,
                border: `1px solid ${secondCar ? "#fc8e3c" : "none"}`,
              }}
              cover={
                !secondCardData && loading ? (
                  <Skeleton.Image active style={{ margin: "auto 0" }} />
                ) : (
                  <img
                    alt="carImage"
                    src={
                      secondCardData
                        ? secondCardData[0].imageURL[0]
                        : cardDummyPic
                    }
                  />
                )
              }
            >
              {!secondCardData && loading ? (
                <Skeleton.Input active style={{ marginTop: "7rem" }} />
              ) : (
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select car brand model"
                  optionFilterProp="children"
                  value={secondCar}
                  onChange={(value) => setSecondCar(value)}
                  options={
                    compareCarList
                      ? compareCarList?.map(
                          (list: {
                            id: string;
                            car: string;
                            identity: string;
                          }) => ({
                            value: list?.identity,
                            label: list?.car,
                          })
                        )
                      : []
                  }
                />
              )}
            </Card>
          </Flex>
        </Col>
        <Col span={20} style={{ marginTop: "2rem" }}>
          <CsDivider title="Details" dividerSize={5} />

          {/* Section 3 */}
          {firstCardData && secondCardData ? (
            <Fragment>
              <Row
                align={"middle"}
                style={{
                  background: "#ff8e3c",
                  marginTop: "1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    Car
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    {compareCarList
                      ? compareCarList.map((list: any) =>
                          list?.identity === firstCar ? list?.car : ""
                        )
                      : ""}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    {compareCarList
                      ? compareCarList.map((list: any) =>
                          list?.identity === secondCar ? list?.car : ""
                        )
                      : ""}
                  </Typography.Text>
                </Col>
              </Row>
              {/* Basic Details */}
              <Row
                align={"middle"}
                style={{
                  background: "#ff8e3c",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    Basic Details
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Price
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    Rs. {firstCardData[0]?.price.toLocaleString()}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    Rs. {secondCardData[0]?.price.toLocaleString()}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "#ececec",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Body Style
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.bodyStyles}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.bodyStyles}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Seating Capacity
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.seatingCapacity}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.seatingCapacity}
                  </Typography.Text>
                </Col>
              </Row>

              <Row
                align={"middle"}
                style={{
                  background: "#ececec",

                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Made Year
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.madeYear}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.madeYear}
                  </Typography.Text>
                </Col>
              </Row>

              {/* Features */}
              <Row
                align={"middle"}
                style={{
                  background: "#ff8e3c",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    Features
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Range
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.range} miles
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.range} miles
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "#ececec",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Top Speed
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.topSpeed} mph
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.topSpeed} mph
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Chargin 0 to 100
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.charging_0_to_100} hr
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.charging_0_to_100} hr
                  </Typography.Text>
                </Col>
              </Row>

              <Row
                align={"middle"}
                style={{
                  background: "#ececec",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Battery Capacity
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.batteryCapacity} kWh
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.batteryCapacity} kWh
                  </Typography.Text>
                </Col>
              </Row>

              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    Ground Clearance
                  </Typography.Text>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {firstCardData[0]?.groundClearance} inch
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.groundClearance} inch
                  </Typography.Text>
                </Col>
              </Row>

              {/* Description */}
              <Row
                align={"middle"}
                style={{
                  background: "#ff8e3c",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    Picture and Description
                  </Typography.Text>
                </Col>
              </Row>

              {/* Image Section */}
              <Row
                style={{
                  marginTop: ".2rem",
                  background: "white",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
                justify={"space-between"}
              >
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ".8rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Image.PreviewGroup items={firstCardData[0]?.imageURL}>
                    <Image
                      title="hi"
                      style={{
                        objectFit: "cover",
                        height: 300,
                        width: 300,
                        borderRadius: "7px",
                      }}
                      src={firstCardData[0]?.imageURL[0]}
                    />
                  </Image.PreviewGroup>
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    {firstCardData[0]?.description}
                  </Typography.Text>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ".8rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Image.PreviewGroup items={secondCardData[0]?.imageURL}>
                    <Image
                      style={{
                        objectFit: "cover",
                        height: 300,
                        width: 300,
                        borderRadius: "7px",
                      }}
                      src={secondCardData[0]?.imageURL[0]}
                    />
                  </Image.PreviewGroup>
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "600" }}
                  >
                    {secondCardData[0]?.description}
                  </Typography.Text>
                </Col>
              </Row>

              {/* Features */}
              <Row
                align={"middle"}
                style={{
                  background: "#ff8e3c",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
              >
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "white",
                      fontSize: ".9rem",
                      fontWeight: "600",
                    }}
                  >
                    Extra Features
                  </Typography.Text>
                </Col>
              </Row>

              <Row
                align={"middle"}
                style={{
                  background: "white",
                  marginTop: ".1rem",
                  padding: ".7rem 1rem",
                  borderRadius: "6px",
                }}
                gutter={[15, 0]}
              >
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.extraFeatures}
                  </Typography.Text>
                </Col>{" "}
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {secondCardData[0]?.extraFeatures}
                  </Typography.Text>
                </Col>{" "}
              </Row>
            </Fragment>
          ) : (
            <Empty
              style={{ marginTop: "2rem" }}
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={
                <span>
                  {firstCar === secondCar && firstCar && secondCar
                    ? "Please, Select Both Different Car Model"
                    : "No Data"}
                </span>
              }
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default CompareCars;
