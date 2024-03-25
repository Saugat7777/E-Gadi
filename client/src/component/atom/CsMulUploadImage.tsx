import { message, Upload, UploadFile } from "antd";
import axios from "axios";
import { useState } from "react";

import { useAppSelector } from "../../store";

const CsMulImageUpload = ({
  imageUrl,
  imageUrlChange,
  isImageUploading,
  removeImage,
}: any) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [fileList, setFileList] = useState<UploadFile[] | []>(
    imageUrl?.length > 0 ? imageUrl : []
  );

  async function beforeUpload(file: File) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/avif" ||
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

  const onRemove = (file: File) => {
    removeImage(file);
  };

  const onFileChange = async ({ onError, onSuccess, file }: any) => {
    isImageUploading(true);
    const selectedImage = file;
    var formData = new FormData();

    formData.append("file", selectedImage);

    if (imageUrl.length >= 4) return;

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
      imageUrlChange(response?.data?.data?.fileUrl, selectedImage?.uid);
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
        maxCount={8}
        onRemove={onRemove}
        accept=".png, .jpg, .webp, .avif"
        multiple={true}
      >
        {fileList.length < 8 && "+ Upload"}
      </Upload>
    </>
  );
};
export default CsMulImageUpload;
