import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  Flex,
  Grid,
  Row,
  Select,
  Typography,
} from "antd";
import { Fragment } from "react";
import firstCarousel from "../../../assets/carousel/car3.jpg";
import secondCarousel from "../../../assets/carousel/car4.jpg";
import aboutUsImage from "../../../assets/carousel/car7.jpg";

import CsCarCard from "../../../component/atom/CsCarCard";
import CsDivider from "../../../component/atom/Divider";

const carouselItem = [
  { id: 1, image: firstCarousel },
  { id: 2, image: secondCarousel },
];

const Home: React.FC = () => {
  const screen = Grid.useBreakpoint();
  console.log(screen);
  return (
    <Fragment>
      {/* Section 1 */}
      <Row justify={"center"}>
        <Col span={24}>
          <Row
            justify={"center"}
            style={{
              marginTop: "6rem",
              height: "37rem",
              width: "100%",
              position: "absolute",
              // background: "red",
              zIndex: "10",
            }}
          >
            <Col span={10}>
              <Flex align="center" justify="center" vertical gap={"middle"}>
                <Typography.Title
                  style={{ color: "white", wordSpacing: ".3rem" }}
                >
                  Find a new Electric car
                </Typography.Title>
                <Card
                  hoverable={true}
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(0.2px)",
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    gap={"large"}
                    style={{ minWidth: "40rem" }}
                  >
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      showSearch
                      placeholder="Model"
                      optionFilterProp="children"
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "tom",
                          label: "Tom",
                        },
                      ]}
                    />
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      showSearch
                      placeholder="Type"
                      optionFilterProp="children"
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "tom",
                          label: "Tom",
                        },
                      ]}
                    />
                    <Button type="primary" icon={<SearchOutlined />}>
                      Search
                    </Button>
                  </Flex>
                </Card>
              </Flex>
            </Col>
          </Row>
          <Carousel autoplay>
            {carouselItem?.map((carousel) => {
              return (
                <div
                  key={carousel.id}
                  style={{
                    background: "red",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      content: "",
                      background: "black",
                      position: "absolute",
                      minHeight: "37rem",
                      width: "100vw",
                    }}
                  />
                  <div
                    style={{
                      minHeight: "37rem",
                      background: `url(${carousel.image}) no-repeat center center/cover`,
                      opacity: "0.7",
                    }}
                  />
                </div>
              );
            })}
          </Carousel>
        </Col>
      </Row>

      {/* Section 2 */}
      <Row justify="center" align="middle">
        <Col md={{ span: 16 }} lg={{ span: 16 }}>
          <CsDivider title={"Newly Added Car"} dividerSize={5} />
          <Row
            justify={"center"}
            align={"middle"}
            style={{ marginTop: "5rem" }}
          >
            <Col span={24}>
              <Flex justify="space-between" align="center">
                <CsCarCard />
                <CsCarCard />
                <CsCarCard />
              </Flex>
            </Col>
          </Row>

          {/* Section 3 */}
          <Row style={{ marginTop: "12rem" }} justify="center" align="middle">
            <Col span={24}>
              <Flex justify="space-between" align="center" gap={40}>
                <Flex vertical style={{ width: "60%" }}>
                  <Typography.Title level={3}>About Us</Typography.Title>
                  <Typography.Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has industry. Lorem Ipsum has been
                  </Typography.Paragraph>
                </Flex>
                <Flex>
                  <img
                    src={aboutUsImage}
                    alt=""
                    style={{
                      height: "20rem",
                      objectFit: "cover",
                    }}
                  />
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
