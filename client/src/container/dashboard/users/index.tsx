import { DeleteOutlined } from "@ant-design/icons";
import { Space, Spin, Table } from "antd";

import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import CsDeleteConfirmation from "../../../component/atom/CsDeleteConfimation";
import { handleBreadCumbs } from "../../../features/globalSlice";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../services/user";
import { useAppDispatch } from "../../../store";

const Users = () => {
  const dispatch = useAppDispatch();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");

  useEffect(() => {
    dispatch(handleBreadCumbs([{ title: "Dashboard" }, { title: "Users" }]));
  }, []);

  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const columns = useMemo(
    () => [
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
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
        title: "Joined at",
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
                src={item}
                alt="User image"
                style={{ width: "50px", height: "auto" }}
              />
            );
          } else {
            return (
              <img
                src={""}
                alt="User image"
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
              {record?.role === "admin" ? null : (
                <DeleteOutlined
                  style={{ color: "#ff8e3c" }}
                  onClick={() => handleVisibleDeleteConfirmation(record)}
                />
              )}
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
      await deleteUser(selectedPopup);
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
        confirmMessage="Are you sure you want to delete the selected user?"
      />
    </Spin>
  );
};

export default Users;
