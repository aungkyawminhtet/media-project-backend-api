import { NextFunction, Request, Response } from "express";

const DB = require("../dbs/tag");
import { fMs } from "../utls/helper";

const GetAllTag = async(req: Request, res: Response, next: NextFunction) => {
    const tags = await DB.find();
    fMs(res, "All tag fetched Successfully", tags);
}

const GetTagById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const tag = await DB.findById(id);
    if(!tag){
        next(new Error("Tag not found"));
    }
    fMs(res, "Tag fetched successfully", tag);
}

const CreateTag = async(req: Request, res: Response, next: NextFunction) => {
    const tag = await DB.findOne({name : req.body.name});
    if(tag){
        next(new Error("Tag already exists"));
    }

    const newTag = await new DB(req.body).save();
    fMs(res, "Tag created successfully", newTag);
}

const updateTag = async(req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    const user = await DB.findById(id);
    if(!user){
        next(new Error("Tag not found"));
    }

    await DB.findByIdAndUpdate(user._id, req.body);
    const updatedTag = await DB.findById(user._id);
    fMs(res, "Tag updated successfully", updatedTag);
}

const deleteTag = async(req: Request, res: Response, next : NextFunction) => {
    let id = req.params.id;
    await DB.findByIdAndDelete(id);
    fMs(res, "Tag deleted successfully", []);
}

export {
    GetAllTag,
    CreateTag,
    GetTagById,
    updateTag,
    deleteTag
}