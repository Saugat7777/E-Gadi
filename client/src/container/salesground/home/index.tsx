import { ArrowRightOutlined } from "@ant-design/icons";
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
import { Fragment, useState } from "react";
import firstCarousel from "../../../assets/carousel/car3.jpg";
import secondCarousel from "../../../assets/carousel/car4.jpg";
import aboutUsImage from "../../../assets/carousel/car7.jpg";

import { useNavigate } from "react-router-dom";
import CsCarCard from "../../../component/atom/CsCarCard";
import CsDivider from "../../../component/atom/Divider";
import { useGetSalesgroundNewCarsQuery } from "../../../services/salesgroundAPI";

const carouselItem = [
  { id: 1, image: firstCarousel },
  { id: 2, image: secondCarousel },
];

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Home: React.FC = () => {
  const screen = Grid.useBreakpoint();
  const { data: newCarsList } = useGetSalesgroundNewCarsQuery();
  const [selectdCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();
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
              zIndex: "10",
            }}
          >
            <Col span={10}>
              <Flex align="center" justify="center" vertical gap={"middle"}>
                <Typography.Title
                  style={{ color: "white", wordSpacing: ".3rem" }}
                  level={screen?.xs ? 4 : 1}
                >
                  Find a New Electric Car
                </Typography.Title>
                <Card
                  hoverable={true}
                  style={{
                    width: `${screen?.xs ? "15rem" : "40rem"}  `,
                    background: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(0.2px)",
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    gap={"large"}
                    wrap="wrap"
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={filterOption}
                      size="large"
                      style={{ width: "70%" }}
                      placeholder="Model"
                      value={selectdCar}
                      onChange={(value) => setSelectedCar(value)}
                      options={
                        newCarsList
                          ? newCarsList?.map((car: any) => ({
                              value: `${car?._id}`,
                              label: `${car?.carBrand} ${car?.carModel}`,
                            }))
                          : []
                      }
                    />

                    <Button
                      type="primary"
                      shape="round"
                      icon={<ArrowRightOutlined />}
                      onClick={() => {
                        navigate(`/salesground/new-cars/details/${selectdCar}`);
                      }}
                    >
                      GO
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
        <Col span={18}>
          <CsDivider title={"Newly Added Car"} dividerSize={5} />
          <Row
            justify={"center"}
            align={"middle"}
            style={{ marginTop: "2rem" }}
          >
            <Col span={24}>
              <Flex justify="center" wrap="wrap">
                {newCarsList
                  ? newCarsList?.slice(-3)?.map((car: any) => (
                      <div style={{ padding: "2rem 1rem" }}>
                        <CsCarCard
                          imageURL={car?.imageURL[0]}
                          title={`${car?.carBrand} ${car?.carModel}`}
                          description={car?.description}
                          price={car?.price}
                          slug={car?._id}
                          reqBy="new-cars"
                          styleBy="home"
                        />
                      </div>
                    ))
                  : null}
              </Flex>
            </Col>
          </Row>

          {/* Section 3 */}
          <Row style={{ marginTop: "12rem" }} justify="center" align="middle">
            <Col span={24}>
              <Flex
                justify={screen?.xs ? "center" : "space-between"}
                align="end"
                gap={"large"}
                wrap="wrap"
              >
                <Flex
                  vertical
                  style={{ width: `${screen?.xs ? "100%" : "50%"}` }}
                  align="stretch"
                >
                  <Typography.Title level={3}>About Us</Typography.Title>
                  <Typography.Paragraph>
                  Welcome to E-Gadi, Nepal's premier destination for electric vehicles (EVs). 
                  At E-Gadi, we're passionate about driving change towards a sustainable future.
                  Our platform was born out of a vision to revolutionize the way Nepalese consumers 
                  engage with transportation. With a deep commitment to environmental conservation 
                  and technological innovation, we aim to make electric mobility accessible and 
                  convenient for everyone in Nepal.
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                  What sets us apart is our dedication to providing
                  a comprehensive marketplace for electric vehicles, where buyers and sellers can 
                  connect seamlessly. Whether you're in search of a sleek electric sedan for 
                  your daily commute or a rugged electric SUV for your off-road adventures, 
                  E-Gadi has you covered.
                  
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                  At E-Gadi, sustainability isn't just a buzzword – it's a way of life.
                  Join us on this electrifying journey towards a greener, brighter tomorrow. 
                  Together, let's drive change and make a lasting impact on Nepal's transportation landscape.

                  Welcome to the future of mobility. Welcome to E-Gadi.
                  </Typography.Paragraph>
                </Flex>
                <Flex>
                  <img
                    src={aboutUsImage}
                    alt=""
                    style={{
                      height: screen?.xs ? "10rem" : "20rem",
                      width: screen?.xs ? "15rem" : "25rem",
                      objectFit: "cover",
                      borderRadius: "7px",
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
