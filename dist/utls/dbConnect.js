"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = void 0;
const mongoose = require('mongoose');
const DbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
};
exports.DbConnect = DbConnect;
