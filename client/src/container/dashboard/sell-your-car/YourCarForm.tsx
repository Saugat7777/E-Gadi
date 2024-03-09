import { Button, Col, Flex, Form, Input, InputNumber, Row } from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CsUploadImage from "../../../component/atom/CsUploadImage";

import {
  usePostUsedCarMutation,
  useUpdateUsedCarMutation,
} from "../../../services/usedCar";

const YourCarForm: React.FC<any> = ({ initialValues }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(initialValues?.imageURL ?? "");
  const [loading, setLoading] = useState<boolean>(false);

  const [postUsedCar, { isLoading: postLoading }] = usePostUsedCarMutation();
  const [updateUsedCar, { isLoading: updateLoading }] =
    useUpdateUsedCarMutation();
  function imageUrlChange(url: any) {
    setImageUrl(url);
  }

  const onFinish = (formData: any) => {
    formData.imageURL = imageUrl;
    if (!!initialValues) {
      try {
        updateUsedCar({ formData, id: initialValues?._id });
        return navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        postUsedCar(formData);
        return navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Form
      name="add-your-car-dashboard"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row>
        <Col span={12}>
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
            label="Ownership"
            name="ownership"
            rules={[{ required: true, message: "Please, enter ownership" }]}
            initialValue={initialValues?.ownership ?? ""}
          >
            <Input placeholder="Enter a ownership" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please, enter address" }]}
            initialValue={initialValues?.ownership ?? ""}
          >
            <Input placeholder="Enter current address" />
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
            label="Kms Driven"
            name="kmsDriven"
            rules={[{ required: true, message: "Please, enter a price" }]}
            initialValue={initialValues?.price ?? ""}
          >
            <InputNumber addonAfter={<span>Kms.</span>} min={1} />
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
                  if (!imageUrl) {
                    return Promise.reject(
                      "Please upload an image file or provide an image URL!"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <CsUploadImage
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

export default YourCarForm;
