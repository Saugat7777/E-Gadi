import { Form } from "antd";
import { Fragment, useState } from "react";

import CsModal from "../atom/CsModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [visibleRegisterForm, setVisibleRegisterForm] =
    useState<boolean>(false);

  return (
    <Fragment>
      <CsModal
        title={visibleRegisterForm ? "REGISTER" : "LOGIN"}
        form={form}
        setVisibleRegisterForm={setVisibleRegisterForm}
        children={
          visibleRegisterForm ? (
            <RegisterForm
              form={form}
              setVisibleRegisterForm={setVisibleRegisterForm}
            />
          ) : (
            <LoginForm
              form={form}
              setVisibleRegisterForm={setVisibleRegisterForm}
            />
          )
        }
      />
    </Fragment>
  );
};

export default Login;
