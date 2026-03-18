"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleImage = exports.saveMultiFiles = exports.saveFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const saveFile = async (req, res, next) => {
    try {
        // console.log(req);
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "No file uploaded in this files" });
        }
        const photo = req.files?.photo;
        // console.log("photooto", photo);
        const uploadDir = path_1.default.join(__dirname, "../uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const uniqueName = Date.now() + "-" + photo.name;
        const uploadPath = path_1.default.join(uploadDir, uniqueName);
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
    }
    catch (error) {
        throw new Error("File upload failed");
    }
};
exports.saveFile = saveFile;
const saveMultiFiles = async (req, res, next) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        let photo = req.files.photo;
        const uploadDir = path_1.default.join(__dirname, "../uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        let filesName = [];
        photo.forEach(async (file) => {
            const uniqueName = Date.now() + "-" + file.name;
            const uploadPath = path_1.default.join(uploadDir, uniqueName);
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
    }
    catch (error) {
        throw new Error("File upload failed");
    }
};
exports.saveMultiFiles = saveMultiFiles;
const deleImage = async (fileName) => {
    await fs_1.default.unlinkSync(path_1.default.join(__dirname, `../uploads/${fileName}`));
    // req.message = "File deleted successfully";
    // next();
};
exports.deleImage = deleImage;
