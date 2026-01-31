"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByUserId = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getCatById = exports.getAllPosts = void 0;
const helper = require("../utls/helper");
const DB = require("../dbs/posts");
const getAllPosts = async (req, res) => {
    const posts = await DB.find().populate('user cat', "-password -__v  ");
    helper.fMs(res, "All posts fetched successfully", posts);
};
exports.getAllPosts = getAllPosts;
const getCatById = async (req, res, next) => {
    const catId = req.params.catId;
    const posts = await DB.find({ cat: catId }).populate('user', "-password -__v");
    helper.fMs(res, "Posts fetched successfully", posts);
};
exports.getCatById = getCatById;
const getPostByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    const posts = await DB.find({ user: userId }).populate('user', "-password -__v");
    helper.fMs(res, "Posts fetched successfully", posts);
};
exports.getPostByUserId = getPostByUserId;
const getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await DB.findById(id).populate('user', "-password - __v");
    helper.fMs(res, "Post fetched successfully", post);
};
exports.getPostById = getPostById;
const createPost = async (req, res) => {
    console.log(req.body);
    let userId = req.body.user._id;
    delete req.body.user;
    req.body['user'] = userId;
    let result = await new DB(req.body).save();
    helper.fMs(res, "Post created successfully", result);
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await DB.findById(id);
    if (!post) {
        throw new Error("Post not found");
    }
    await DB.findByIdAndUpdate(post._id, req.body);
    const updatedPost = await DB.findById(post._id);
    helper.fMs(res, "Post updated successfully", updatedPost);
};
exports.updatePost = updatePost;
const deletePost = async (req, res, next) => {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    helper.fMs(res, "Post deleted successfully", []);
};
exports.deletePost = deletePost;
