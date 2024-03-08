import { Button, Card, Col, Flex, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useAppDispatch } from "../../../store";
import NewElectricCarForm from "./NewElectricCarForm";

const EditNewElectricCar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { initialValues } = location.state;

  useEffect(() => {
    dispatch(
      handleBreadCumbs([
        { title: "Dashboard" },
        { title: "New Electric Car" },
        { title: "Edit" },
      ])
    );
  }, []);

  return (
    <Card title="Edit New Electric Car">
      <NewElectricCarForm initialValues={initialValues} />
    </Card>
  );
};

export default EditNewElectricCar;
