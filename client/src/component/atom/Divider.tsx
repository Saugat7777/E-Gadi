import { Col, Divider, Flex, Grid, Row, Typography } from "antd";
import { Fragment } from "react";

interface CsDivider {
  dividerSize: number;
  title: string;
}

const CsDivider = ({ dividerSize, title }: CsDivider) => {
  const screen = Grid.useBreakpoint();
  return (
    <Fragment>
      <Row justify={"center"} style={{ marginTop: "1rem" }}>
        <Col span={dividerSize}>
          <Divider
            style={{
              background: "#ff8e3c",
              borderRadius: "19px",
              height: ".3rem",
            }}
          />
        </Col>
      </Row>

      <Row justify={"center"} style={{ marginTop: "-2.3rem" }}>
        <Col span={12}>
          <Flex justify="center">
            <Typography.Title level={screen?.xs ? 4 : 3}>
              {title}
            </Typography.Title>
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CsDivider;
