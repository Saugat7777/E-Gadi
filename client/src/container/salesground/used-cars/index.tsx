import { Col, Flex, Grid, Row, Typography } from "antd";

import { Fragment } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import firstCarousel from "../../../assets/carousel/futuristic-concept-art-electric-car-station.jpg";
import CsCarCard from "../../../component/atom/CsCarCard";
import CsDivider from "../../../component/atom/Divider";
import { useGetSalesgroundUsedCarsQuery } from "../../../services/salesgroundAPI";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const UsedCars = () => {
  const screen = Grid.useBreakpoint();

  const { data } = useGetSalesgroundUsedCarsQuery();

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
                Used Cars
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  color: "#fefbf7",
                  letterSpacing: ".1rem",
                  textAlign: "center",
                }}
              >
                Discover the perfect used car for your family with our help.
                Explore reliability, affordability, and features to match your
                needs and budget.
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

      {/* Section 2 */}
      <Row align={"middle"} justify={"center"}>
        <Col span={20}>
          <CsDivider title="Used Cars" dividerSize={5} />
        </Col>{" "}
        <Col span={20}>
          {data ? (
            <Carousel
              responsive={responsive}
              autoPlaySpeed={4000}
              showDots={true}
              autoPlay={true}
              infinite={true}
            >
              {data?.map((car: any) => {
                return (
                  <div
                    style={{
                      padding: "2rem 2rem 4rem 2rem",
                    }}
                    key={car?._id}
                  >
                    <CsCarCard
                      imageURL={car?.imageURL[0]}
                      title={`${car?.carBrand} ${car?.carModel}`}
                      description={car?.description}
                      price={car?.price}
                      slug={car?._id}
                      reqBy="used-cars"
                      styleBy="responsive"
                    />
                  </div>
                );
              })}
            </Carousel>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  );
};

export default UsedCars;
