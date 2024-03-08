import { Card } from "antd";
import { useEffect } from "react";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useAppDispatch } from "../../../store";
import NewElectricCarForm from "./NewElectricCarForm";

const AddNewElectricCar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      handleBreadCumbs([
        { title: "Dashboard" },
        { title: "New Electric Car" },
        { title: "Add" },
      ])
    );
  }, []);
  return (
    <Card title="Add New Electric Car">
      <NewElectricCarForm />
    </Card>
  );
};

export default AddNewElectricCar;
