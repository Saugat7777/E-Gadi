import { Col, Row } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ViewHeader: React.FC<Props> = ({ children }) => {
  return (
    <Row align={"middle"} style={{ marginBottom: "2rem" }}>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default ViewHeader;
