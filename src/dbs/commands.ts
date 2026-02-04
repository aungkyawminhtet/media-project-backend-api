import { required } from "joi";

const mongoose = require('mongoose');
const {Schema} = mongoose;


const CommandSchema = new Schema({
    post : {type: Schema.Types.ObjectId, required: true, ref: "post"},
    name: {type: String, required:true},
    email: {type: String, required:true},
    context: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const Cmd = mongoose.model("command", CommandSchema);

module.exports = Cmd;
export{};