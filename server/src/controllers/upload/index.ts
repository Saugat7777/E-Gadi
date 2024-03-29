import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const fileName = req.file?.filename;
    const fileUrl = `${process.env.BASE_URL}/upload/image/${fileName}`;

    return res
      .status(200)
      .json({ message: "File uploaded sucessfully !", data: { fileUrl } });
  } catch (error) {
    return res.status(500).json({ message: "Error!", error });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const uploadsDirectory = path.join(__dirname, "../../../uploads");

    const filePath = path.join(uploadsDirectory, filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Serve the image file
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(500).json({ message: "Error! ", error });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const uploadedFiles = req.files as Express.Multer.File[];

    if (uploadedFiles?.length === 0)
      return res
        .status(200)
        .json({ message: "Please, upload at least one photo" });

    if (uploadedFiles !== undefined && uploadedFiles.length > 0) {
      let fileUrl: string[] = [];
      const prefix = `${process.env.BASE_URL}/upload/image/`;
      uploadedFiles.forEach((file) => {
        fileUrl.push(`${prefix}${file.filename}`);
      });

      return res
        .status(200)
        .json({ message: "File uploaded sucessfully !", data: { fileUrl } });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error!", error });
  }
};
