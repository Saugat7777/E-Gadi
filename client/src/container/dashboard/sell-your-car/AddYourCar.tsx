import { Card } from "antd";
import { useEffect } from "react";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useAppDispatch } from "../../../store";

import YourCarForm from "./YourCarForm";

const AddYourCar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      handleBreadCumbs([
        { title: "Dashboard" },
        { title: "Sell Your Car" },
        { title: "Add" },
      ])
    );
  }, []);
  return (
    <Card title="Add Your Car">
      <YourCarForm />
    </Card>
  );
};

export default AddYourCar;
