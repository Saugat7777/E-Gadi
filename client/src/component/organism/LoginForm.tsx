import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import {
  handelNavigatePath,
  handleShowLoginModal,
} from "../../features/authSlice";
import { useLoginMutation } from "../../services/authAPI";

import { useAppDispatch, useAppSelector } from "../../store";

import { Fragment } from "react";
import { validateEmail } from "../../utils/help";
import CsGoogleLogin from "./CsGoogleLogin";

const LoginForm = ({ form, setVisibleRegisterForm }: any) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmitForm = async (formData: any) => {
    await login(formData);
    if (accessToken?.length > 0) {
      dispatch(handleShowLoginModal());
    }
    dispatch(handelNavigatePath());
  };

  return (
    <Fragment>
      <Divider />
      <Form
        form={form}
        name={`login-form`}
        layout="vertical"
        onFinish={handleSubmitForm}
        style={{ marginTop: "1rem" }}
      >
        <Form.Item
          name="email"
          rules={[{ validator: validateEmail }]}
          validateTrigger="onBlur"
          style={{ marginTop: ".2rem" }}
        >
          <Input
            type="email"
            size="large"
            placeholder="Your email"
            prefix={<UserOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true }]}
          validateTrigger="onBlur"
          style={{ marginTop: ".4rem" }}
        >
          <Input.Password
            size="large"
            placeholder="Your password"
            prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>

        <Flex justify="center" style={{ marginBottom: "1rem" }}>
          <span>
            <Typography.Link
              onClick={() => setVisibleRegisterForm("RESET-EMAIL-FORM")}
            >
              {" "}
              Reset Password{" "}
            </Typography.Link>{" "}
          </span>
        </Flex>

        <Form.Item style={{ margin: "0 0 0 0" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={isLoading}
          >
            {isLoading ? "Signing..." : "Sign In"}
          </Button>
        </Form.Item>
      </Form>
      <Divider type="horizontal">
        <Typography.Text>OR</Typography.Text>{" "}
      </Divider>
      <Flex align="center" vertical gap={20}>
        <CsGoogleLogin />

        <div onClick={() => setVisibleRegisterForm("REGISTER")}>
          <Flex vertical justify="center" align="center">
            <Typography.Text>
              Don't have an account yet?{" "}
              <Typography.Link>Create your account</Typography.Link>{" "}
            </Typography.Text>
          </Flex>
        </div>
      </Flex>
    </Fragment>
  );
};

export default LoginForm;
