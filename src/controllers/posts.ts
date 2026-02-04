import { NextFunction, Request, Response } from "express";
const helper = require("../utls/helper");
const DB = require("../dbs/posts");
const cmdDB = require("../dbs/commands");

const getAllPosts = async(req: Request, res: Response) => {
    const posts = await DB.find().populate('user cat', "-password -__v  ");
    helper.fMs(res, "All posts fetched successfully", posts);   
}

const getCatById = async(req: Request, res: Response, next: NextFunction) => {
    const catId =req.params.catId;
    const posts = await DB.find({cat: catId}).populate('user', "-password -__v");

    helper.fMs(res, "Posts fetched successfully", posts);
}

const getPostByUserId = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const posts = await DB.find({user: userId}).populate('user', "-password -__v");
    helper.fMs(res, "Posts fetched successfully", posts);
}

const getPostById = async(req: Request, res: Response) => {

    let id = req.params.id;
    let post = await DB.findById(id);
    let getCmd = await cmdDB.find({post: post._id});
    post = post.toObject();
    post["commands"] = getCmd;
    helper.fMs(res, "Post fetched successfully", post);
}

const getPostByTag = async(req: Request, res: Response, next: NextFunction) => {
    let tag = req.params.tagId;

    const posts = await DB.find({tag: tag}).populate('user', "-password -__v");

    if(!posts){
        next(new Error("Posts not found"));
    }
    helper.fMs(res, "Posts fetched successfully", posts);
}

const createPost = async(req: Request, res: Response) => {
    console.log(req.body);
    let userId = req.body.user._id;
    delete req.body.user;
    req.body['user'] = userId;
    let result = await new DB(req.body).save();
    helper.fMs(res, "Post created successfully", result);
}

const updatePost = async(req: Request, res: Response) => {
    const id = req.params.id;
    const post = await DB.findById(id);
    if (!post){
        throw new Error("Post not found");
    }
    await DB.findByIdAndUpdate(post._id, req.body);
    const updatedPost = await DB.findById(post._id);
    helper.fMs(res, "Post updated successfully", updatedPost);
}

const deletePost = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    helper.fMs(res, "Post deleted successfully", []);
}  

const addLike = async(req: Request, res: Response, next: NextFunction) => {
    let post = await DB.findById(req.params.id);
    if(!post){
        next(new Error("Post not found"));
    }

    post.like = post.like + 1;
    await DB.findByIdAndUpdate(post._id, post);
    const addLike = await DB.findById(post._id);
    helper.fMs(res, "Like added successfully", addLike);
}

const removeLike = async(req: Request, res: Response, next: NextFunction) => {
    let post = await DB.findById(req.params.id);
    if(!post){
        next(new Error("Post not found"));
    }

    post.like = post.like - 1;
    await DB.findByIdAndUpdate(post._id, post);
    const addLike = await DB.findById(post._id);
    helper.fMs(res, "Like added successfully", addLike);
}

const getPagination = async(req: Request, res: Response, next: NextFunction) => {
    let page: number =Number(req.params.page);
    page = page <= 0 ? 1 : page;
    let skip = (page - 1) * Number(process.env.PAGE_LIMIT);
    const posts = await DB.find().skip(skip).limit(Number(process.env.PAGE_LIMIT));

    helper.fMs(res, "Posts fetched successfully", posts);
}

export { getAllPosts, getCatById, getPostById, createPost, updatePost, deletePost,getPostByUserId, getPagination, getPostByTag,addLike,removeLike };