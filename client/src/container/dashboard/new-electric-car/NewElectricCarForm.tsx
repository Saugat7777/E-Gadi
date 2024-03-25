import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CsMulImageUpload from "../../../component/atom/CsMulUploadImage";

import moment from "moment";
import { uid } from "uid";
import {
  usePostNewCarMutation,
  useUpdateNewCarMutation,
} from "../../../services/newCarAPI";
import { IMulImage } from "../sell-your-car/YourCarForm";

const config = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please enter made year",
    },
  ],
};

const NewElectricCarForm: React.FC<any> = ({ initialValues }) => {
  const navigate = useNavigate();
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<IMulImage[]>(
    initialValues
      ? initialValues?.imageURL?.map((url: string) => ({ url, uid: uid() }))
      : []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [postNewCar, { isLoading: postLoading }] = usePostNewCarMutation();
  const [updateNewCar, { isLoading: updateLoading }] =
    useUpdateNewCarMutation();

  function imageUrlChange(url: string, uid: string) {
    setImageUrl((prevValues) => [...prevValues, { url, uid }]);
  }

  function removeImage(file: any) {
    setImageUrl((prevValues) =>
      prevValues.filter((value) => value.uid !== file.uid)
    );
  }

  const onFinish = (form: any) => {
    form.imageURL = imageUrl.map((image) => image.url);
    form.madeYear = form.madeYear.format("YYYY");

    if (!!initialValues) {
      try {
        updateNewCar({ formData: form, id: initialValues?._id });
        return navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        postNewCar(form);
        return navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Form
      name="add-electric-car-dashboard"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row>
        <Col span={screen?.xs ? 24 : 12}>
          <Form.Item
            label="Brand Name"
            name="carBrand"
            rules={[{ required: true, message: "Please, enter brand name" }]}
            initialValue={initialValues?.carBrand ?? ""}
          >
            <Input placeholder="Enter a brand" />
          </Form.Item>{" "}
          <Form.Item
            name="carModel"
            rules={[{ required: true, message: "Please, enter model name" }]}
            label="Model Name"
            initialValue={initialValues?.carModel ?? ""}
          >
            <Input placeholder="Enter a model" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please, enter description" }]}
            initialValue={initialValues?.description ?? ""}
          >
            <Input placeholder="Enter a description" />
          </Form.Item>
          <Form.Item
            label="Body Styles"
            name="bodyStyles"
            rules={[{ required: true, message: "Please, enter body styles" }]}
            initialValue={initialValues?.bodyStyles ?? ""}
          >
            <Input placeholder="Enter a body styles" />
          </Form.Item>
          <Form.Item
            label="Made Year"
            name="madeYear"
            initialValue={
              initialValues?.madeYear
                ? moment(initialValues?.madeYear, "YYYY")
                : ""
            }
            {...config}
          >
            <DatePicker picker="year" format={"YYYY"} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please, enter a price" }]}
            initialValue={initialValues?.price ?? ""}
          >
            <InputNumber
              addonBefore={<span>Rs.</span>}
              min={100000}
              step={100000}
            />
          </Form.Item>{" "}
          <Form.Item
            label="Range"
            name="range"
            rules={[{ required: true, message: "Please, enter a range" }]}
            initialValue={initialValues?.range ?? ""}
          >
            <InputNumber
              addonAfter={<span>miles</span>}
              placeholder="Enter range"
            />
          </Form.Item>{" "}
          <Form.Item
            label="Top Speed"
            name="topSpeed"
            rules={[{ required: true, message: "Please, enter a top speed" }]}
            initialValue={initialValues?.topSpeed ?? ""}
          >
            <InputNumber
              placeholder="Enter top speed"
              addonAfter={<span>mph</span>}
            />
          </Form.Item>
          <Form.Item
            label="Ground Clearance"
            name="groundClearance"
            rules={[
              { required: true, message: "Please, enter ground clearance" },
            ]}
            initialValue={initialValues?.groundClearance ?? ""}
          >
            <InputNumber
              addonAfter={<span>inch</span>}
              placeholder="Enter ground clearance"
            />
          </Form.Item>{" "}
          <Form.Item
            label="Battery Capacity"
            name="batteryCapacity"
            rules={[
              { required: true, message: "Please, enter battery capacity" },
            ]}
            initialValue={initialValues?.batteryCapacity ?? ""}
          >
            <InputNumber
              placeholder="Enter battery capacity"
              addonAfter={<span>kWh</span>}
            />
          </Form.Item>
          <Form.Item
            label="Charging 0 to 100 in"
            name="charging_0_to_100"
            rules={[
              { required: true, message: "Please, enter charging 0 to 100" },
            ]}
            initialValue={initialValues?.charging_0_to_100 ?? ""}
          >
            <InputNumber
              placeholder="Enter charging 0 to 100 in"
              addonAfter={<span>hr </span>}
            />
          </Form.Item>
          <Form.Item
            label="Seating Capacity"
            name="seatingCapacity"
            rules={[
              { required: true, message: "Please, enter seating capacity" },
            ]}
            initialValue={initialValues?.seatingCapacity ?? ""}
          >
            <InputNumber
              placeholder="Enter sitting capacity"
              addonAfter={<span>Adults</span>}
            />
          </Form.Item>
          <Form.Item
            label="Extra features"
            name="extraFeatures"
            rules={[
              { required: true, message: "Please, enter extra features" },
            ]}
            initialValue={initialValues?.extraFeatures ?? ""}
          >
            <Input placeholder="Enter extra features" />
          </Form.Item>{" "}
          <Form.Item
            label={
              <>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ` <span style="color: red">*</span> Upload Image (select a JPG or a PNG image) `,
                  }}
                />
              </>
            }
            name={"imageURL"}
            rules={[
              ({}) => ({
                validator() {
                  if (imageUrl?.length === 0) {
                    return Promise.reject(
                      "Please upload an image file or provide an image URL!"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <CsMulImageUpload
              removeImage={removeImage}
              imageUrl={imageUrl}
              imageUrlChange={imageUrlChange}
              isImageUploading={setLoading}
            />
          </Form.Item>
          <Form.Item style={{ margin: "2rem 0 0 0" }}>
            <Flex align="center" gap={8}>
              <Button
                type="primary"
                htmlType="submit"
                loading={postLoading || updateLoading}
              >
                {!!initialValues ? "Update" : "Add"}
              </Button>

              <Button type="default" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Flex>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default NewElectricCarForm;
