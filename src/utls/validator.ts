import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


const DB = require("../dbs/users");

export const validator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body);

        if (error) {
            // console.log(error);
            next(new Error(error.details[0].message));
        }else{
            next();
        }
        // return check
    }
}

export const validateParam = (schema: any, name: string)=> {
    return (req: Request, res: Response, next: NextFunction) => {
        const obj:any = {};
        obj[`${name}`] = req.params[`${name}`];
        // console.log("objj",obj);
        const {error} = schema.validate(obj);
        if(error){
            next(new Error(error.details[0].message));
        }else{
            next();
        }
    }
}

export const validateToken = async(req: Request, res: Response, next: NextFunction) => {
    let token:any = req.headers.authorization?.split(" ")[1];
    let scecrectKey:any = process.env.SECRET_KEY || 'secrectkey';
    if (!token) {
        next(new Error("unauthorized user one"));
    }
    const user:any = jwt.decode(token,scecrectKey);
    
    if (!user) {
        next(new Error("unauthorized user two"));
    }
    const findUser = await DB.findById(user._id).select("-password -__v");
    req.body["user"] = findUser;

    // console.log(req.body);

    next();
}