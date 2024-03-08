import React from "react";
import { useAppSelector } from "../../../store";

const NewCars = () => {
  const { loggedInUser } = useAppSelector((state) => state?.auth);

  return <div>NewCars</div>;
};

export default NewCars;
