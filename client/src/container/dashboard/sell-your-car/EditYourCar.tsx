import { Card } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useAppDispatch } from "../../../store";
import YourCarForm from "./YourCarForm";

const EditYourCar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { initialValues } = location.state;

  useEffect(() => {
    dispatch(
      handleBreadCumbs([
        { title: "Dashboard" },
        { title: "Sell Your Car" },
        { title: "Edit" },
      ])
    );
  }, []);

  return (
    <Card title="Edit Your Car">
      <YourCarForm initialValues={initialValues} />
    </Card>
  );
};

export default EditYourCar;
