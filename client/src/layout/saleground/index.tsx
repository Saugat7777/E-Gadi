import { Layout } from "antd";

import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

const Salesground: React.FC = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Layout>
        <Header />
        <Content
          style={{
            margin: "0 0 0 0",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Salesground;
