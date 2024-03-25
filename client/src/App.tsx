import { Spin, Tour, TourProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
} from "./container/dashboard/profile";
import { toggleTourState } from "./features/globalSlice";
import Routing from "./routes";

import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loggedInUser, loginMethod } = useAppSelector((state) => state.auth);
  const { openTour } = useAppSelector((state) => state.global);
  const [current, setCurrent] = useState(0);

  const steps: TourProps["steps"] = [
    {
      title: "Incomplete Profile!",
      description:
        "Before uploading your car, please follow instruction to complete your detail.",
      target: () => ref1?.current,
      onNext() {
        setCurrent((currentValue) => currentValue + 1);
        navigate("/dashboard/profile");
      },
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
    },

    {
      title: "Profile Page",
      description: "Navigate to profile page.",
      target: () => ref2?.current,
      onNext() {
        setCurrent((currentValue) => currentValue + 1);
      },
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
    },
    {
      title: "Contact",
      description: "Update your contact number.",
      target: () => ref3?.current,
      onNext() {
        setCurrent((currentValue) => currentValue + 1);
      },
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
    },
    {
      title: "Social Media",
      description: "Update your facebook and instagram handle.",
      target: () => ref4?.current,
      onNext() {
        setCurrent((currentValue) => currentValue + 1);
      },
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
    },
    {
      title: "Avatar",
      description: "Update your avatar.",
      target: () => ref5?.current,
      onNext() {
        setCurrent((currentValue) => currentValue + 1);
      },
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
    },
    {
      title: "Complete",
      description: "Update your changes and ready to upload your car!",
      target: () => ref6?.current,
      onPrev() {
        setCurrent((currentValue) => currentValue - 1);
      },
      onFinish() {
        setCurrent(0);
        navigate("/dashboard/sell-your-car");
        dispatch(toggleTourState());
      },
    },
  ];

  return (
    <Spin spinning={false}>
      <Tour
        open={openTour}
        onClose={() => {
          dispatch(toggleTourState());
          setCurrent(0);
          navigate("/dashboard/sell-your-car");
        }}
        mask={true}
        type="primary"
        steps={steps}
        current={current}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
      <Routing loggedInUserData={loggedInUser} />
    </Spin>
  );
}

export default App;
