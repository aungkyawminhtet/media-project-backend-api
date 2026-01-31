"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.decode = exports.encode = exports.fMs = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fMs = async (res, msg, result) => {
    res.status(200).json({
        con: true,
        msg,
        data: result
    });
};
exports.fMs = fMs;
const encode = (data) => {
    return bcryptjs_1.default.hashSync(data);
};
exports.encode = encode;
const decode = (data, hash) => {
    return bcryptjs_1.default.compareSync(data, hash);
};
exports.decode = decode;
const token = (payload) => {
    const secretKey = process.env.SECRET_KEY || 'secrectkey';
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.token = token;
