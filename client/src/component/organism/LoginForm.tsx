import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import {
  handelNavigatePath,
  handleShowLoginModal,
} from "../../features/authSlice";
import { useLoginMutation } from "../../services/authAPI";
import { useGetCurrentUserQuery } from "../../services/userDataAPI";
import { useAppDispatch, useAppSelector } from "../../store";

import { Fragment } from "react";
import { validateEmail } from "../../utils/help";

const LoginForm = ({ form, setVisibleRegisterForm }: any) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { refetch } = useGetCurrentUserQuery();

  const handleSubmitForm = async (formData: any) => {
    await login(formData);
    if (accessToken?.length > 0) {
      dispatch(handleShowLoginModal());
    }
    refetch();
    setTimeout(() => {
      dispatch(handelNavigatePath());
    }, 2000);
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

        <Form.Item style={{ margin: "2rem 0 0 0" }}>
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
        <Button>Login with Google</Button>
        <div onClick={() => setVisibleRegisterForm(true)}>
          <Typography.Text>
            Don't have an account yet?{" "}
            <Typography.Link>Create your account</Typography.Link>{" "}
          </Typography.Text>
        </div>
      </Flex>
    </Fragment>
  );
};

export default LoginForm;
