"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserbByid = exports.getall = void 0;
const helper_1 = require("../utls/helper");
const DB = require("../dbs/users");
const register = async (req, res, next) => {
    // console.log("before password ", req.body.password);
    let encoded = (0, helper_1.encode)(req.body.password);
    req.body.password = encoded;
    const user = await DB.findOne({ email: req.body.email });
    if (user) {
        next(new Error("User already exists"));
    }
    const CreateUser = await new DB(req.body).save();
    (0, helper_1.fMs)(res, "User created sucessfully", CreateUser);
};
exports.register = register;
const login = async (req, res, next) => {
    const user = await DB.findOne({ email: req.body.email }).select("-__v");
    if (!user) {
        next(new Error("User not found"));
    }
    const check = (0, helper_1.decode)(req.body.password, user.password);
    if (check) {
        let createToken = (0, helper_1.token)(user.toObject());
        const result = {
            ...user.toObject(),
            token: createToken
        };
        (0, helper_1.fMs)(res, "User logged in successfully", result);
    }
    else {
        next(new Error("Invalid password"));
    }
};
exports.login = login;
const getall = async (req, res, next) => {
    const users = await DB.find();
    (0, helper_1.fMs)(res, "All users fetched successfully", users);
};
exports.getall = getall;
const getUserbByid = async (req, res, next) => {
    const id = req.params.id;
    const user = await DB.findById(id);
    (0, helper_1.fMs)(res, "User fetched successfully", user);
};
exports.getUserbByid = getUserbByid;
const createUser = async (req, res, next) => {
    const newUser = await new DB(req.body).save();
    (0, helper_1.fMs)(res, "User created successfully", newUser);
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await DB.findById(id);
    if (!user) {
        return next(new Error("User not found"));
    }
    await DB.findByIdAndUpdate(user._id, req.body);
    const updatedUser = await DB.findById(user._id);
    (0, helper_1.fMs)(res, "User updated successfully", updatedUser);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    (0, helper_1.fMs)(res, "User deleted successfully", []);
};
exports.deleteUser = deleteUser;
