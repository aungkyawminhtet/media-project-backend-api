"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = exports.getPostByTag = exports.getPagination = exports.getPostByUserId = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getCatById = exports.getAllPosts = void 0;
const helper = require("../utls/helper");
const DB = require("../dbs/posts");
const cmdDB = require("../dbs/commands");
const getAllPosts = async (req, res) => {
    const posts = await DB.find().populate("user cat", "-password -__v  ");
    helper.fMs(res, "All posts fetched successfully", posts);
};
exports.getAllPosts = getAllPosts;
const getCatById = async (req, res, next) => {
    const catId = req.params.catId;
    const posts = await DB.find({ cat: catId }).populate("user", "-password -__v");
    helper.fMs(res, "Posts fetched successfully", posts);
};
exports.getCatById = getCatById;
const getPostByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    const posts = await DB.find({ user: userId }).populate("user", "-password -__v");
    helper.fMs(res, "Posts fetched successfully", posts);
};
exports.getPostByUserId = getPostByUserId;
const getPostById = async (req, res, next) => {
    let id = req.params.id;
    let post = await DB.findById(id);
    if (!post) {
        next(new Error("Post not found with that Id!"));
    }
    let getCmd = await cmdDB.find({ post: post._id });
    post = post.toObject();
    post["commands"] = getCmd;
    helper.fMs(res, "Post fetched successfully", post);
};
exports.getPostById = getPostById;
const getPostByTag = async (req, res, next) => {
    let tag = req.params.tagId;
    const posts = await DB.find({ tag: tag }).populate("user", "-password -__v");
    if (!posts) {
        next(new Error("Posts not found with this tag Id"));
    }
    helper.fMs(res, "Posts fetched successfully", posts);
};
exports.getPostByTag = getPostByTag;
const createPost = async (req, res) => {
    let userId = req.body.user._id;
    delete req.body.user;
    // console.log(req.body);
    req.body["user"] = userId;
    let post = await DB.findOne({ title: req.body.title });
    if (post) {
        throw new Error("Post already exists");
    }
    let result = await new DB(req.body).save();
    helper.fMs(res, "Post created successfully", result);
};
exports.createPost = createPost;
const updatePost = async (req, res, next) => {
    const id = req.params.id;
    const post = await DB.findById(id);
    if (!post) {
        next(new Error("Post not found"));
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
const toggleLike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (!post) {
        next(new Error("Post not found"));
    }
    if (Number(req.params.toggleLike) == 1) {
        post.like = post.like + 1;
    }
    else {
        if (post.like > 0) {
            post.like = post.like - 1;
        }
        // post.like = post.like - 1;
    }
    // post.like = post.like + 1;
    await DB.findByIdAndUpdate(post._id, post);
    const addLike = await DB.findById(post._id);
    helper.fMs(res, "Like added successfully", addLike);
};
exports.toggleLike = toggleLike;
// const removeLike = async(req: Request, res: Response, next: NextFunction) => {
//     let post = await DB.findById(req.params.id);
//     if(!post){
//         next(new Error("Post not found"));
//     }
//     post.like = post.like - 1;
//     await DB.findByIdAndUpdate(post._id, post);
//     const addLike = await DB.findById(post._id);
//     helper.fMs(res, "Like added successfully", addLike);
// }
const getPagination = async (req, res, next) => {
    let page = Number(req.params.page);
    page = page <= 0 ? 1 : page;
    let skip = (page - 1) * Number(process.env.PAGE_LIMIT);
    const posts = await DB.find()
        .skip(skip)
        .limit(Number(process.env.PAGE_LIMIT));
    helper.fMs(res, "Posts pagination fetched successfully", posts);
};
exports.getPagination = getPagination;
