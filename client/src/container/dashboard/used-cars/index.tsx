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
        key: "carBrand",
      },
      {
        title: "Model",
        dataIndex: "carModel",
        key: "carModel",
      },
      {
        title: "Seller Name",
        dataIndex: "sellerName",
        key: "sellerName",
      },
      {
        title: "Contact",
        dataIndex: "contactNumber",
        key: "contactNumber",
      },
      {
        title: "Location",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Created",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: string) => moment(value).format("LL"),
      },
      {
        title: "Picture",
        dataIndex: "imageURL",
        key: "imageURL",
        render: (item) => {
          if (item) {
            return (
              <img
                src={item[0]}
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
      <Table
        columns={columns}
        dataSource={data}
        style={{ overflowX: "scroll" }}
      />

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
