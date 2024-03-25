import { message, Upload, UploadFile } from "antd";
import axios from "axios";
import { useState } from "react";

import { useAppSelector } from "../../store";

const CsImageUpload = ({ imageUrl, imageUrlChange, isImageUploading }: any) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [fileList, setFileList] = useState<UploadFile[] | []>(
    imageUrl !== ""
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: imageUrl,
          },
        ]
      : []
  );

  async function beforeUpload(file: File) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const onRemove = () => {
    imageUrlChange("");
  };

  const onFileChange = async ({ onError, onSuccess, file }: any) => {
    isImageUploading(true);
    const selectedImage = file;
    var formData = new FormData();
    formData.append("file", selectedImage);
    const fileName = selectedImage.name;

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/upload/image`;

      // Make the POST request using Axios
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": accessToken ?? "",
        },
      });
      onSuccess("ok");
      imageUrlChange(response?.data?.data?.fileUrl);
    } catch (error) {
      onError("error");
      console.log(error, "respp");
    } finally {
      isImageUploading(false);
    }
  };
  return (
    <>
      <Upload
        // ref={ref5}
        listType="picture-card"
        fileList={fileList}
        customRequest={onFileChange}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        maxCount={1}
        onRemove={onRemove}
        accept=".png, .jpg, .webp"
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </>
  );
};
export default CsImageUpload;
