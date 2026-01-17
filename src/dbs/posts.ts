const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    "user": {type: Schema.Types.ObjectId, required: true, ref: "user"},
    "cat" : {type: Schema.Types.ObjectId, required: true, ref: "cat"},
    "image": {type: String, required: true},
    "name": {type: String, required: true},
    "desc": {type: String, required: true},
    "createdAt": {type: Date, default: Date.now}
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
export {};
