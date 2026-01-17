const mongoose = require('mongoose');

export const DbConnect = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
    }
}