import { NextFunction, Request, Response } from "express";
const helper = require("../utls/helper");
const DB = require("../dbs/posts");

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
    const id = req.params.id;
    const post = await DB.findById(id).populate('user',"-password - __v");
    helper.fMs(res, "Post fetched successfully", post);
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

export { getAllPosts, getCatById, getPostById, createPost, updatePost, deletePost,getPostByUserId };