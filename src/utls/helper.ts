import bcrypt from "bcryptjs";
import { Response } from "express";
import jwt from 'jsonwebtoken';

const fMs = async(res: Response, msg:string, result: any[]) => {
    res.status(200).json({
        con: true,
        msg,
        result
    });
}

const encode = (data: string) => {
    return bcrypt.hashSync(data);
}

const decode = (data: string, hash: string) => {
    return bcrypt.compareSync(data, hash);
}

const token = (payload :string) => {
    const secretKey = process.env.SECRET_KEY || 'secrectkey';
    return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}

export {fMs, encode, decode, token};