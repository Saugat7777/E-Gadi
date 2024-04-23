import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Radio,
  Row,
  Select
} from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import CsMulImageUpload from "../../../component/atom/CsMulUploadImage";
import {
  usePostUsedCarMutation,
  useUpdateUsedCarMutation,
} from "../../../services/usedCar";

export interface IMulImage {
  url: string;
  uid: string;
}

const YourCarForm: React.FC<any> = ({ initialValues }) => {
  const navigate = useNavigate();
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<IMulImage[]>(
    initialValues
      ? initialValues?.imageURL?.map((url: string) => ({ url, uid: uid() }))
      : []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [postUsedCar, { isLoading: postLoading }] = usePostUsedCarMutation();
  const [updateUsedCar, { isLoading: updateLoading }] =
    useUpdateUsedCarMutation();

  function imageUrlChange(url: string, uid: string) {
    setImageUrl((prevValues) => [...prevValues, { url, uid }]);
  }

  function removeImage(file: any) {
    setImageUrl((prevValues) =>
      prevValues.filter((value) => value.uid !== file.uid)
    );
  }

  const onFinish = (formData: any) => {
    formData.imageURL = imageUrl.map((image) => image.url);
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
        <Col span={screen?.xs ? 24 : 12}>
          <Form.Item
            label="Brand Name"
            name="carBrand"
            rules={[
              { required: true, message: "Please enter brand name" },
              { max: 15, message: "Brand name must be 15 characters or fewer" },
            ]}
            initialValue={initialValues?.carBrand ?? ""}
          >
            <Input placeholder="Enter a brand" />
          </Form.Item>{" "}
          <Form.Item
            name="carModel"
            rules={[
              { required: true, message: "Please enter model name" },
              { max: 15, message: "Model name must be 15 characters or fewer" },
            ]}
            label="Model Name"
            initialValue={initialValues?.carModel ?? ""}
          >
            <Input placeholder="Enter a model" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter description" },
              {
                max: 75,
                message: "Description must be less than 75 characters",
              },
            ]}
            initialValue={initialValues?.description ?? ""}
          >
            <Input placeholder="Enter a description" />
          </Form.Item>
          <Form.Item
            label="Ownership"
            name="ownership"
            rules={[{ required: true, message: "Please select ownership" }]}
            initialValue={initialValues?.ownership ?? null}
          >
             <Select
              placeholder="Select a ownership"
              options={[
                { label: "First Ownerhsip", value: "First Ownerhsip" },
                {
                  label: "Second Ownerhsip",
                  value: "Second Ownerhsip",
                },
                {
                  label: "Third Ownerhsip",
                  value: "Third Ownerhsip",
                },
                {
                  label: "Fourth Ownerhsip",
                  value: "Fourth Ownerhsip",
                },
                {
                  label: "Four Plus Ownerhsip",
                  value: "Four Plus Ownerhsip",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter address" },
              {
                max: 30,
                message: "Address must be 30 characters or fewer",
              },
            ]}
            initialValue={initialValues?.address ?? ""}
          >
            <Input placeholder="Enter current address" />
          </Form.Item>
          <Form.Item
            label="Condition"
            name="condition"
            rules={[{ required: true, message: "Please select condition" }]}
            initialValue={initialValues?.condition ?? null}
          >
            <Select
              placeholder="Select a condition"
              options={[
                { label: "New", value: "New" },
                { label: "Like New", value: "Like New" },
                {
                  label: "Used",
                  value: "Used",
                },
                {
                  label: "Fair",
                  value: "Fari",
                },
                {
                  label: "Poor",
                  value: "Poor",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Modification"
            name="modification"
            rules={[{ required: true, message: "Please, select modification" }]}
            initialValue={initialValues?.modification ?? false}
          >
            <Radio.Group style={{ width: "50%" }}>
              <Radio.Button value={true} style={{ width: "50%" }}>
                Yes
              </Radio.Button>
              <Radio.Button value={false} style={{ width: "50%" }}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Accident History"
            name="accidentHistory"
            rules={[
              { required: true, message: "Please, select accident history" },
            ]}
            initialValue={initialValues?.accidentHistory ?? false}
          >
            <Radio.Group style={{ width: "50%" }}>
              <Radio.Button value={true} style={{ width: "50%" }}>
                Yes
              </Radio.Button>
              <Radio.Button value={false} style={{ width: "50%" }}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter a price" },
              {
                type: "number",
                min: 100000,
                message: "Minimum price is 1 lakh",
              },
              {
                type: "number",
                max: 500000000,
                message: "Maximum price is 50 crore",
              },
            ]}
            initialValue={initialValues?.price ?? ""}
          >
            <InputNumber addonBefore={<span>Rs.</span>} step={100000} />
          </Form.Item>{" "}
          <Form.Item
            label="Negotiability"
            name="negotiability"
            rules={[
              { required: true, message: "Please, select negotiability" },
            ]}
            initialValue={initialValues?.negotiability ?? true}
          >
            <Radio.Group style={{ width: "50%" }}>
              <Radio.Button value={true} style={{ width: "50%" }}>
                Yes
              </Radio.Button>
              <Radio.Button value={false} style={{ width: "50%" }}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Kms Driven"
            name="kmsDriven"
            rules={[
              { required: true, message: "Please enter kms driven" },
              {
                type: "number",
                min: 10,
                message: "Minimum kms driven is 10 kms",
              },
              {
                type: "number",
                max: 500000,
                message: "Maximum kms driven is 500000 kms",
              },
            ]}
            initialValue={initialValues?.kmsDriven ?? ""}
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
              imageUrl={imageUrl}
              imageUrlChange={imageUrlChange}
              isImageUploading={setLoading}
              removeImage={removeImage}
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
