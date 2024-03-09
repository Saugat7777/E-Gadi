import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Spin, Table, Tour, TourProps } from "antd";

import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CsDeleteConfirmation from "../../../component/atom/CsDeleteConfimation";
import ViewHeader from "../../../component/organism/ViewHeader";
import {
  handleBreadCumbs,
  toggleTourState,
} from "../../../features/globalSlice";
import {
  useDeleteUsedCarMutation,
  useGetUsedCarByCurrentUserQuery,
} from "../../../services/usedCar";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ref1, ref2 } from "../profile";

const SellYourCar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");

  useEffect(() => {
    dispatch(
      handleBreadCumbs([{ title: "Dashboard" }, { title: "Sell Your Car" }])
    );
  }, []);

  const { loggedInUser } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetUsedCarByCurrentUserQuery();
  const [deleteUsedCar] = useDeleteUsedCarMutation();
  const columns = useMemo(
    () => [
      {
        title: "Brand",
        dataIndex: "carBrand",
        key: "car_brand",
        ellipsis: true,
        width: "20%",
      },
      {
        title: "Model",
        dataIndex: "carModel",
        key: "carModel",
        ellipsis: true,
        width: "20%",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        width: "25%",
      },
      {
        title: "Created",
        dataIndex: "createdAt",
        key: "createdAt",
        ellipsis: true,
        width: "25%",
        render: (value: string) => moment(value).format("LL"),
      },
      {
        title: "Picture",
        dataIndex: "imageURL",
        key: "imageURL",
        width: "20%",
        ellipsis: true,
        render: (item) => {
          if (item) {
            return (
              <img
                src={item}
                alt="Car image"
                style={{ width: "50px", height: "auto" }}
              />
            );
          } else {
            return (
              <img
                src={""}
                alt="Car image"
                style={{ width: "50px", height: "auto" }}
              />
            );
          }
        },
      },
      {
        title: "Action",
        key: "action",
        width: "15%",
        render: (_: any, record: any) => {
          return (
            <Space>
              <EditOutlined
                style={{
                  color: "#ff8e3c",
                  marginRight: ".2rem",
                }}
                onClick={() => {
                  navigate("/dashboard/sell-your-car/edit", {
                    state: { initialValues: record },
                  });
                }}
              />
              <DeleteOutlined
                style={{ color: "#ff8e3c" }}
                onClick={() => handleVisibleDeleteConfirmation(record)}
              />
            </Space>
          );
        },
      },
    ],
    [data]
  );

  const handleVisibleDeleteConfirmation = (item: any) => {
    setSelectedPopup(item?._id);
    setVisibility(true);
  };

  const handleCancelDeleteConfirmation = () => {
    setSelectedPopup("");
    setVisibility(false);
  };

  const handleSubmitDeleteConfirmation = async () => {
    setVisibility(false);
    try {
      await deleteUsedCar(selectedPopup);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <ViewHeader>
        <Button
          type="primary"
          onClick={() => {
            if ((loggedInUser as any)?.verified)
              return navigate("/dashboard/sell-your-car/add");
            dispatch(toggleTourState());
          }}
          ref={ref1}
        >
          Add Your Car
        </Button>
        <Button style={{ marginLeft: "1rem" }}>hello</Button>
      </ViewHeader>

      <Table columns={columns} dataSource={data} />

      <CsDeleteConfirmation
        visible={visibleDeleteConfirmation}
        handleDelete={handleSubmitDeleteConfirmation}
        handleCancel={handleCancelDeleteConfirmation}
        confirmMessage="Are you sure you want to delete the selected new car?"
      />
    </Spin>
  );
};

export default SellYourCar;
