import { NextFunction, Response, Request } from "express";
import { fMs } from "../utls/helper";

const DB = require('../dbs/commands');

const getAllCommands = async(req: Request, res: Response, next: NextFunction) => {
    const cmds = await DB.find();
    fMs(res, "All commands fetched successfully", cmds);
}

const getCommandsById = async(req: Request, res: Response, next : NextFunction) => {
    let id = req.params.id;
    const cmd = await DB.findById(id);
    if(!cmd){
        next(new Error("Command not found"));
    }
    fMs(res, "Command fetched successfully", cmd);
}

const getCommandsByPostId = async(req: Request, res: Response, next: NextFunction) => {
    const cmds = await DB.find({post: req.params.postId});
    if(!cmds){
        next(new Error("Commands not found with this post id"));
    }
    fMs(res, "Commands fetched successfully", cmds);
}

const createCommand = async(req: Request, res: Response, next: NextFunction)=> {
    const checkCmd = await DB.findOne({name: req.body.name});

    if(checkCmd) {
        next(new Error("Command already exists"));
    }
    
    const cmd = await new DB(req.body).save();
    fMs(res, "Command created successfully", cmd);
}

const updateCommand = async(req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    const cmd = await DB.findById(id);
    if(!cmd) {
        next(new Error("Command not found"));
    }
    await DB.findByIdAndUpdate(cmd._id, req.body);
    const updatedCmd = await DB.findById(cmd._id);
    fMs(res, "Command updated successfully", updatedCmd);
}

const delCommand = async(req: Request, res: Response, next: NextFunction) => {
    let cmd = await DB.findById(req.params.id);
    if(!cmd) {
        next(new Error("Command not found with that id!"));
    }
    await DB.findByIdAndDelete(req.params.id);
    fMs(res, "Command deleted successfully", []);
}

export {
    getAllCommands,
    getCommandsById,
    createCommand,
    updateCommand,
    delCommand,
    getCommandsByPostId
}