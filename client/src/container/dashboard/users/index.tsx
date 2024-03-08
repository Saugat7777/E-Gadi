import { DeleteOutlined } from "@ant-design/icons";
import { Space, Spin, Table } from "antd";

import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useGetUsersQuery } from "../../../services/user";
import { useAppDispatch } from "../../../store";

const Users = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleBreadCumbs([{ title: "Dashboard" }, { title: "Users" }]));
  }, []);

  const { data, isLoading } = useGetUsersQuery();

  const columns = useMemo(
    () => [
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        ellipsis: true,
        width: "20%",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
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
        title: "Joined at",
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
        width: "15%",
        render: (_: any, record: any) => {
          return (
            <Space>
              <DeleteOutlined
                style={{ color: "#ff8e3c" }}
                // onClick={() => handleVisibleDeleteConfirmation(record)}
              />
            </Space>
          );
        },
      },
    ],
    [data]
  );

  return (
    <Spin spinning={isLoading}>
      <Table columns={columns} dataSource={data} />
      {/* <Table columns={columns} dataSource={data} />

      <CsDeleteConfirmation
        visible={visibleDeleteConfirmation}
        handleDelete={handleSubmitDeleteConfirmation}
        handleCancel={handleCancelDeleteConfirmation}
        confirmMessage="Are you sure you want to delete the selected new car?"
      /> */}
    </Spin>
  );
};

export default Users;
