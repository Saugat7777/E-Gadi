import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Grid, Layout, Row, Typography } from "antd";
const Footer = () => {
  const screen = Grid.useBreakpoint();
  const { Footer } = Layout;
  return (
    <Footer
      style={{ textAlign: "center", background: "white", marginTop: "8rem" }}
    >
      <Row justify={"center"} align={"top"} style={{ marginTop: "1rem" }}>
        <Col span={17}>
          <Flex justify="center">
            <Flex vertical align="center" justify="center">
              <Typography.Text strong>Contact Us</Typography.Text>
              <Typography.Paragraph>
                If you want to contact, you can contact us from Sunday - Friday
                from 9am - 5pm.
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Col>
        <Col span={17}>
          <Flex
            justify={screen?.xs ? "center" : "space-between"}
            align="center"
            style={{ width: "100%" }}
            wrap="wrap"
          >
            <Flex vertical align={screen?.xs ? "center" : "start"} gap={9}>
              <Flex gap={10} wrap="wrap" justify="center">
                <EnvironmentOutlined />
                <Typography.Text strong>Lalitpur, Nepal</Typography.Text>
              </Flex>
              <Flex gap={10} justify="center">
                <PhoneOutlined rotate={90} />
                <Typography.Text strong>9848449577</Typography.Text>
              </Flex>
              <Flex gap={10} wrap="wrap" justify="center">
                <MailOutlined />
                <Typography.Text strong>customercare@egadi.com</Typography.Text>
              </Flex>
            </Flex>

            <Flex vertical align={screen?.xs ? "center" : "end"}>
              <Button type="link">About Us</Button>
              <Button type="link">Contact</Button>
              <Button type="link">Privacy Policy</Button>
            </Flex>
          </Flex>
        </Col>
        <Col
          span={24}
          style={{
            background: "#2a2a2a",
            color: "white",
            padding: ".4rem",
            marginTop: "3rem",
          }}
        >
          E-Gadi ©{new Date().getFullYear()} Crafted by ConfuseSuon
        </Col>
      </Row>
    </Footer>
  );
};

export default Footer;
