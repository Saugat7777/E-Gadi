import { LockOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CsImageUpload from "../../../component/atom/CsUploadImage";
import { handleBreadCumbs } from "../../../features/globalSlice";
import { useUpdateUserMutation } from "../../../services/user";
import { useGetCurrentUserAllDataQuery } from "../../../services/userDataAPI";
import { useAppDispatch } from "../../../store";

export const ref1 = { current: null };
export const ref2 = { current: null };
export const ref3 = { current: null };
export const ref4 = { current: null };
export const ref5 = { current: null };
export const ref6 = { current: null };

const Profile = () => {
  const dispatch = useAppDispatch();
  const screen = Grid.useBreakpoint();

  const [form] = Form.useForm();

  // const {} =   useAppSelector((state) => state.auth)

  const { data, isLoading } = useGetCurrentUserAllDataQuery();
  const [updateUser] = useUpdateUserMutation();

  const [imageUrl, setImageUrl] = useState(data?.imageURL ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  function imageUrlChange(url: any) {
    setImageUrl(url);
  }

  useEffect(() => {
    dispatch(handleBreadCumbs([{ title: "Dashboard" }, { title: "Profile" }]));
  }, []);

  useEffect(() => {
    if (data) setImageUrl(data?.imageURL);
  }, [data]);

  const onFinish = (formData: any) => {
    formData.imageURL = imageUrl;
    formData.password = formData?.confirmPassword;
    formData.socialMedia = [
      { facebook: formData.facebook, instagram: formData.instagram },
    ];
    delete formData["confirmPassword"];
    delete formData["newPassword"];
    delete formData["facebook"];
    delete formData["instagram"];

    updateUser({ id: data?._id, formData });
  };

  return (
    <Spin spinning={isLoading}>
      {data ? (
        <Card title={`Hi, ${data?.full_name}`}>
          <Form
            name="add-electric-car-dashboard"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Row gutter={[20, 0]}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  label="Full Name"
                  name="full_name"
                  rules={[
                    { required: true, message: "Please, enter full name" },
                  ]}
                  initialValue={data?.full_name ?? ""}
                >
                  <Input placeholder="Enter a full name" />
                </Form.Item>{" "}
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please, enter email" }]}
                  label="Email"
                  initialValue={data?.email ?? ""}
                >
                  <Input type="email" placeholder="Enter a email" />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please, enter address" }]}
                  initialValue={data?.address ?? ""}
                >
                  <Input placeholder="Enter a address" />
                </Form.Item>
                <div ref={ref3}>
                  <Form.Item
                    label="Contact Number"
                    name="contactNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please, enter a contact number",
                      },
                    ]}
                    initialValue={data?.contactNumber ?? ""}
                  >
                    <Input placeholder="Enter a contact number" />
                  </Form.Item>{" "}
                </div>
                <div ref={ref4}>
                  <Typography.Text style={{ margin: "0 0 0 .2rem" }}>
                    <span style={{ color: "#fb565a" }}>*</span> Social Media
                  </Typography.Text>
                  <Row gutter={[16, 0]} style={{ marginTop: ".2rem" }}>
                    <Col span={12}>
                      <Form.Item
                        name="facebook"
                        rules={[
                          {
                            required: true,
                            message: "Please, enter facebook link",
                          },
                        ]}
                        initialValue={data?.socialMedia[0]?.facebook ?? ""}
                      >
                        <Input placeholder="Enter a facebook link" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="instagram"
                        rules={[
                          {
                            required: true,
                            message: "Please, enter instagram link",
                          },
                        ]}
                        initialValue={data?.socialMedia[0]?.instagram ?? ""}
                      >
                        <Input placeholder="Enter a instagram link" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  validateTrigger="onBlur"
                  style={{ marginTop: ".4rem" }}
                  hidden={data?.passwordVerified ? false : true}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (data?.passwordVerified === false) {
                          return Promise.resolve();
                        }
                        if (
                          getFieldValue("newPassword") ||
                          getFieldValue("confirmPassword")
                        ) {
                          if (!value)
                            return Promise.reject(
                              new Error("Please, enter current password")
                            );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Current password"
                    prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
                  />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  validateTrigger="onBlur"
                  style={{ marginTop: ".4rem" }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (data?.passwordVerified === false) {
                          if (!value && !!getFieldValue("confirmPassword"))
                            return Promise.reject(
                              new Error("Please, enter new password")
                            );
                        }

                        if (data?.passwordVerified === true) {
                          if (
                            !!getFieldValue("confirmPassword") ||
                            !!getFieldValue("currentPassword")
                          )
                            if (!value) {
                              return Promise.reject(
                                new Error("Please, enter  new password")
                              );
                            }
                        }

                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="New Password"
                    prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  style={{ marginTop: ".4rem" }}
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value && !!getFieldValue("newPassword"))
                          return Promise.reject(
                            new Error("Please, enter confirm password")
                          );
                        if (value && getFieldValue("newPassword") !== value)
                          return Promise.reject(
                            new Error(
                              "New passowrd and confirm password does not matched"
                            )
                          );

                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm password"
                    prefix={<LockOutlined style={{ marginRight: ".4rem" }} />}
                  />
                </Form.Item>
                <div ref={ref5}>
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
                          if (!!imageUrl) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Please upload an image file or provide an image URL!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <CsImageUpload
                      imageUrl={imageUrl}
                      imageUrlChange={imageUrlChange}
                      isImageUploading={setLoading}
                    />
                  </Form.Item>
                </div>
                <Form.Item style={{ margin: "2rem 0 0 0" }}>
                  <Flex align="center" gap={8}>
                    <Button type="primary" htmlType="submit" ref={ref6}>
                      Update
                    </Button>

                    <Button type="default" onClick={() => form.resetFields()}>
                      Cancel
                    </Button>
                  </Flex>
                </Form.Item>
              </Col>

              <Col style={{ display: screen?.xs ? "none" : "" }}>
                {data?.imageURL ? (
                  <Avatar src={data?.imageURL} size={200} shape="square" />
                ) : null}
              </Col>
            </Row>
          </Form>
        </Card>
      ) : null}
    </Spin>
  );
};

export default Profile;
