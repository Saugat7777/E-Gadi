import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Flex, Form, Input, Typography } from "antd";
import {
  handelNavigatePath,
  handleShowLoginModal,
} from "../../features/authSlice";
import { useLoginMutation } from "../../services/authAPI";

import { useAppDispatch, useAppSelector } from "../../store";

import { Fragment, useEffect, useState } from "react";
import {
  usePostGenerateOTPMutation,
  usePostVerifyOTPMutation,
} from "../../services/forgotPassword";
import { showMessage, validateEmail } from "../../utils/help";

const ResetPasswordForm = ({ form, setVisibleRegisterForm }: any) => {
  const [userEmail, setUserEmail] = useState<string>("");

  const [
    generateOTP,
    {
      isLoading: otpGeneratedLoading,
      data: otpGeneratedData,
      error: otpGeneratedError,
    },
  ] = usePostGenerateOTPMutation();

  const [
    verifyOTP,
    {
      isLoading: otpVerifiedLoading,
      data: otpVerifiedData,
      error: otpVerifyError,
    },
  ] = usePostVerifyOTPMutation();

  useEffect(() => {
    if (otpVerifiedData) {
      setVisibleRegisterForm("LOGIN");
    }
  }, [otpVerifiedData]);

  const handleEmailSubmitForm = async (formData: any) => {
    const { resetEmail: email } = formData;
    setUserEmail(email);
    await generateOTP({ email });
  };

  const handlePasswordSubmitForm = async (formData: any) => {
    const { receivedOTP, confirmNewPassword: password } = formData;
    await verifyOTP({
      email: userEmail,
      receivedOTP,
      password,
    });
  };

  return (
    <Fragment>
      <Divider />
      {!otpGeneratedData ? (
        <Form
          form={form}
          name={`reset-email-form`}
          layout="vertical"
          onFinish={handleEmailSubmitForm}
          style={{ marginTop: "1rem" }}
        >
          <Form.Item
            name="resetEmail"
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

          <Form.Item style={{ margin: ".4rem 0 0 0" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              size="large"
              loading={otpGeneratedLoading}
            >
              {otpGeneratedLoading ? "Getting" : "Get OTP"}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Fragment>
          <Alert
            message="An OTP has been sent to your Gmail. Please check your inbox."
            type="success"
            showIcon
          />
          <Form
            form={form}
            name={`reset-password-form`}
            layout="vertical"
            onFinish={handlePasswordSubmitForm}
            style={{ marginTop: "1rem" }}
          >
            <Form.Item
              name="receivedOTP"
              rules={[
                {
                  required: true,
                  message: "Please enter otp",
                },
              ]}
              validateTrigger="onBlur"
              style={{ marginTop: ".4rem" }}
            >
              <Input
                size="large"
                placeholder="Enter your otp"
                prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter new password",
                },
              ]}
              validateTrigger="onBlur"
              style={{ marginTop: ".4rem" }}
            >
              <Input.Password
                size="large"
                placeholder="New password"
                prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
              />
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              style={{ marginTop: ".4rem" }}
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
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

            <Form.Item style={{ margin: ".4rem 0 0 0" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                size="large"
                loading={otpVerifiedLoading}
              >
                {otpVerifiedLoading ? "Resetting" : "Reset"}
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPasswordForm;
