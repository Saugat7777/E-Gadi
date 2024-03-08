import {
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import { Fragment, useEffect } from "react";
import {
  handelNavigatePath,
  handleShowLoginModal,
} from "../../features/authSlice";
import { useRegisterUserMutation } from "../../services/user";
import { useGetCurrentUserQuery } from "../../services/userDataAPI";
import { useAppDispatch, useAppSelector } from "../../store";

const RegisterForm = ({ form, setVisibleRegisterForm }: any) => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { refetch } = useGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinish = async (formData: any) => {
    const body = {
      ...formData,
      email: formData.regEmail,
      password: formData.regPassword,
    };
    delete body.regPassword;
    delete body.confirmRegPassword;
    delete body.regEmail;

    await registerUser(body);

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
        onFinish={onFinish}
        style={{ marginTop: "1rem" }}
      >
        <Form.Item name="full_name" rules={[{ required: true }]}>
          <Input
            placeholder="Your fullname"
            size="large"
            prefix={<UserOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>
        <Form.Item name="address" rules={[{ required: true }]}>
          <Input
            placeholder="Your address"
            size="large"
            prefix={<EnvironmentOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>
        <Form.Item
          name="regEmail"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
            },
          ]}
          style={{ marginTop: ".4rem" }}
        >
          <Input
            size="large"
            placeholder="Your email"
            prefix={<MailOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>
        <Form.Item
          name="regPassword"
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

        <Form.Item
          name="confirmRegPassword"
          style={{ marginTop: ".4rem" }}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("regPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm password"
            prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
          />
        </Form.Item>

        <Form.Item style={{ margin: "2rem 0 0 0" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
      <Divider type="horizontal">
        <Typography.Text>OR</Typography.Text>{" "}
      </Divider>
      <Flex align="center" vertical gap={20}>
        <Button>Login with Google</Button>
        <div onClick={() => setVisibleRegisterForm(false)}>
          <Typography.Text>
            Already have an account? <Typography.Link>Login</Typography.Link>{" "}
          </Typography.Text>
        </div>
      </Flex>
    </Fragment>
  );
};

export default RegisterForm;
