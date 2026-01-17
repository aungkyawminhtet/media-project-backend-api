import { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";

export interface CustomRequest extends Request {
  imageName?: string;
  image?: string;
  message?: string;
}

export const saveFile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photo = req.files?.photo as fileUpload.UploadedFile;

    // console.log("photooto", photo);

    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueName = Date.now() + "-" + photo.name;
    const uploadPath = path.join(uploadDir, uniqueName);

    await photo.mv(uploadPath);

    req.body['image'] = uniqueName;
    // console.log("from iamge ", req.body);
    next();
    // console.log("success image");

    // return res.status(200).json({
    //   message: "File uploaded successfully",
    //   fileName: uniqueName,
    //   filePath: `/uploads/${uniqueName}`,
    // });
  } catch (error) {
    throw new Error("File upload failed");
  }
};

export const saveMultiFiles = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let photo: any = req.files.photo as fileUpload.UploadedFile;

    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let filesName: string[] = [];
    photo.forEach(async(file: fileUpload.UploadedFile) => {
      const uniqueName = Date.now() + "-" + file.name;
      const uploadPath = path.join(uploadDir, uniqueName);

      filesName.push(uniqueName);
      await file.mv(uploadPath);
    });

    req.image = filesName.join(",");
    next();

    // return res.status(200).json({
    //   message: "File uploaded successfully",
    //   fileName: uniqueName,
    //   filePath: `/uploads/${uniqueName}`,
    // });
  } catch (error) {
    throw new Error("File upload failed");
  }
};

export const deleImage = async(fileName:string) => {
    await fs.unlinkSync(path.join(__dirname, `../uploads/${fileName}`));
    
    // req.message = "File deleted successfully";
    // next();
}
