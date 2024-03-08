import { DeleteOutlined } from "@ant-design/icons";
import { Space, Spin, Table } from "antd";

import moment from "moment";
import { useEffect, useMemo, useState } from "react";

import CsDeleteConfirmation from "../../../component/atom/CsDeleteConfimation";

import { handleBreadCumbs } from "../../../features/globalSlice";
import {
  useDeleteUsedCarMutation,
  useGetUsedCarsQuery,
} from "../../../services/usedCar";
import { useAppDispatch } from "../../../store";

const UsedCars = () => {
  const dispatch = useAppDispatch();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");

  useEffect(() => {
    dispatch(
      handleBreadCumbs([{ title: "Dashboard" }, { title: "Used Cars" }])
    );
  }, []);

  const { data, isLoading } = useGetUsedCarsQuery();
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
        title: "Seller Name",
        dataIndex: "sellerName",
        key: "sellerName",
        ellipsis: true,
        width: "20%",
      },
      {
        title: "Contact",
        dataIndex: "contactNumber",
        key: "contactNumber",
        ellipsis: true,
        width: "20%",
      },
      {
        title: "Location",
        dataIndex: "address",
        key: "address",
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

export default UsedCars;
