"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.validateParam = exports.validator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB = require("../dbs/users");
const validator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // console.log(error);
            next(new Error(error.details[0].message));
        }
        else {
            next();
        }
        // return check
    };
};
exports.validator = validator;
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const obj = {};
        obj[`${name}`] = req.params[`${name}`];
        // console.log("objj",obj);
        const { error } = schema.validate(obj);
        if (error) {
            next(new Error(error.details[0].message));
        }
        else {
            next();
        }
    };
};
exports.validateParam = validateParam;
const validateToken = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    let scecrectKey = process.env.SECRET_KEY || 'secrectkey';
    if (!token) {
        next(new Error("unauthorized user one"));
    }
    const user = jsonwebtoken_1.default.decode(token, scecrectKey);
    if (!user) {
        next(new Error("unauthorized user two"));
    }
    const findUser = await DB.findById(user._id).select("-password -__v");
    req.body["user"] = findUser;
    // console.log(req.body);
    next();
};
exports.validateToken = validateToken;
