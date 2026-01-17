require('dotenv').config();
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import path from 'path';
import { DbConnect } from './utls/dbConnect';
import { swaggerSpec } from './utls/swaggerUi';

const swaggerUi = require('swagger-ui-express');


const uploadFile = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(uploadFile());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

DbConnect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const catRouter = require('./routes/cats');

app.use('/api/v1/users',userRouter);
app.use('/api/v1/posts',postRouter);
app.use('/api/v1/cats',catRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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