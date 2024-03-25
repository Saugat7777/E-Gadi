import { Button, Modal } from "antd";
import React, { useState } from "react";
import { handleShowLoginModal } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../store";

interface ICsModalProps {
  title: string;
  children: React.ReactNode;
  form: any;
  setVisibleRegisterForm: any;
}

const CsModal: React.FC<ICsModalProps> = ({
  title,
  children,
  form,
  setVisibleRegisterForm,
}) => {
  const { showLoginModal } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setVisibleRegisterForm("LOGIN");
    dispatch(handleShowLoginModal());
  };

  return (
    <>
      <Modal
        open={showLoginModal}
        title={title}
        onCancel={handleCancel}
        maskClosable={false}
        afterClose={() => form.resetFields()}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default CsModal;
