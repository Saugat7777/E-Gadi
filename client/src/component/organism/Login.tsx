import { Form } from "antd";
import { Fragment, useState } from "react";

import CsModal from "../atom/CsModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [visibleRegisterForm, setVisibleRegisterForm] = useState<
    "REGISTER" | "LOGIN" | "RESET-EMAIL-FORM"
  >("LOGIN");

  return (
    <Fragment>
      <CsModal
        title={
          visibleRegisterForm === "LOGIN"
            ? "LOGIN"
            : visibleRegisterForm === "REGISTER"
            ? "REGISTER"
            : visibleRegisterForm === "RESET-EMAIL-FORM"
            ? "RESET PASSWORD"
            : ""
        }
        form={form}
        setVisibleRegisterForm={setVisibleRegisterForm}
        children={
          visibleRegisterForm === "LOGIN" ? (
            <LoginForm
              form={form}
              setVisibleRegisterForm={setVisibleRegisterForm}
            />
          ) : visibleRegisterForm === "REGISTER" ? (
            <RegisterForm
              form={form}
              setVisibleRegisterForm={setVisibleRegisterForm}
            />
          ) : visibleRegisterForm === "RESET-EMAIL-FORM" ? (
            <ResetPasswordForm
              form={form}
              setVisibleRegisterForm={setVisibleRegisterForm}
            />
          ) : null
        }
      />
    </Fragment>
  );
};

export default Login;
