import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Spin, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CsDeleteConfirmation from "../../../component/atom/CsDeleteConfimation";
import ViewHeader from "../../../component/organism/ViewHeader";
import { handleBreadCumbs } from "../../../features/globalSlice";
import {
  useDeleteNewCarMutation,
  useGetNewCarsQuery,
} from "../../../services/newCarAPI";
import { useAppDispatch } from "../../../store";
const NewElectricCar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visibleDeleteConfirmation, setVisibility] = useState<Boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<string>("");
  useEffect(() => {
    dispatch(
      handleBreadCumbs([{ title: "Dashboard" }, { title: "New Electric Car" }])
    );
  }, []);

  const { data, isLoading } = useGetNewCarsQuery();
  const [deleteNewCar] = useDeleteNewCarMutation();

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
        key: "car_model",
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
        render: (value: string) => moment(value).format("YYYY-MM-DD"),
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
                alt="New car image"
                style={{ width: "50px", height: "auto" }}
              />
            );
          } else {
            return (
              <img
                src={""}
                alt="New car image"
                style={{ width: "50px", height: "auto" }}
              />
            );
          }
        },
      },
      {
        title: "Status",
        width: "10%",
        render: () => <Tag color="success">Active</Tag>,
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
                  navigate("/dashboard/new-electric-car/edit", {
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
      await deleteNewCar(selectedPopup);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <ViewHeader>
        <Button
          type="primary"
          onClick={() => navigate("/dashboard/new-electric-car/add")}
        >
          Add New Electric Car
        </Button>
      </ViewHeader>

      <Table dataSource={data} columns={columns} />
      <CsDeleteConfirmation
        visible={visibleDeleteConfirmation}
        handleDelete={handleSubmitDeleteConfirmation}
        handleCancel={handleCancelDeleteConfirmation}
        confirmMessage="Are you sure you want to delete the selected new car?"
      />
    </Spin>
  );
};

export default NewElectricCar;
