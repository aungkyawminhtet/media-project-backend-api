"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dbConnect_1 = require("./utls/dbConnect");
const swaggerUi_1 = require("./utls/swaggerUi");
const swaggerUi = require('swagger-ui-express');
const uploadFile = require('express-fileupload');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(uploadFile());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
(0, dbConnect_1.DbConnect)();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUi_1.swaggerSpec));
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const catRouter = require('./routes/cats');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/cats', catRouter);
app.use((err, req, res, next) => {
    const status = err.status || 200;
    res.status(status).json({
        con: false,
        msg: err.message,
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//images upload files
// import { CustomRequest, deleImage, saveFile, saveMultiFiles } from './utls/saveFiles';
// app.post("/upload", saveMultiFiles, (req: CustomRequest, res: Response) => {
//     res.status(200).json({
//         msg: "File uploaded successfully",
//         fileName: req.images
//     });
// });
// app.delete("/upload/:fileName",(req: Request, res: Response, next: NextFunction) => {
//     const fileName = req.params.fileName;
//     deleImage(fileName);
//     res.status(200).json({
//         msg: "File deleted successfully"
//     });
// });
