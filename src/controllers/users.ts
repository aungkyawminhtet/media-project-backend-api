import { NextFunction, Request, Response } from "express";
import { decode, encode, fMs, token } from "../utls/helper";
const DB = require("../dbs/users");

const register =  async(req: Request, res: Response, next: NextFunction) => {
    // console.log("before password ", req.body.password);
    let encoded = encode(req.body.password);
    req.body.password = encoded;
    const user = await DB.findOne({email: req.body.email});
    if(user) {
        next(new Error("User already exists"));
    }
    const CreateUser = await new DB(req.body).save();
    fMs(res, "User created sucessfully", CreateUser);
}

const login = async(req: Request, res: Response, next: NextFunction) => {
    const user = await DB.findOne({email : req.body.email}).select("-__v");

    if (!user) {
        next(new Error("User not found"));
    }

    const check = decode(req.body.password, user.password);
    if (check) {
        let createToken = token(user.toObject());
        const result = {
            ...user.toObject(),
            token: createToken
        }
        fMs(res, "User logged in successfully", result);
    } else {
        next(new Error("Invalid password"));
    }
}

const getall = async(req: Request, res : Response, next: NextFunction) => {
    const users = await DB.find();
    fMs(res, "All users fetched successfully", users);
};

const getUserbByid = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await DB.findById(id);
    fMs(res, "User fetched successfully", user);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await new DB(req.body).save();
    fMs(res,"User created successfully", newUser);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await DB.findById(id);
    if(!user){
        return next(new Error("User not found"));
    }
    await DB.findByIdAndUpdate(user._id, req.body);
    const updatedUser = await DB.findById(user._id);
    fMs(res, "User updated successfully", updatedUser);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    fMs(res, "User deleted successfully", []);
};

export { getall, getUserbByid, createUser, updateUser, deleteUser, register, login };