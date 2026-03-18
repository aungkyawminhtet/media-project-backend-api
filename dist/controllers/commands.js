"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandsByPostId = exports.delCommand = exports.updateCommand = exports.createCommand = exports.getCommandsById = exports.getAllCommands = void 0;
const helper_1 = require("../utls/helper");
const DB = require('../dbs/commands');
const getAllCommands = async (req, res, next) => {
    const cmds = await DB.find();
    (0, helper_1.fMs)(res, "All commands fetched successfully", cmds);
};
exports.getAllCommands = getAllCommands;
const getCommandsById = async (req, res, next) => {
    let id = req.params.id;
    const cmd = await DB.findById(id);
    if (!cmd) {
        next(new Error("Command not found"));
    }
    (0, helper_1.fMs)(res, "Command fetched successfully", cmd);
};
exports.getCommandsById = getCommandsById;
const getCommandsByPostId = async (req, res, next) => {
    const cmds = await DB.find({ post: req.params.postId });
    if (!cmds) {
        next(new Error("Commands not found with this post id"));
    }
    (0, helper_1.fMs)(res, "Commands fetched successfully", cmds);
};
exports.getCommandsByPostId = getCommandsByPostId;
const createCommand = async (req, res, next) => {
    const checkCmd = await DB.findOne({ name: req.body.name });
    if (checkCmd) {
        next(new Error("Command already exists"));
    }
    const cmd = await new DB(req.body).save();
    (0, helper_1.fMs)(res, "Command created successfully", cmd);
};
exports.createCommand = createCommand;
const updateCommand = async (req, res, next) => {
    let id = req.params.id;
    const cmd = await DB.findById(id);
    if (!cmd) {
        next(new Error("Command not found"));
    }
    await DB.findByIdAndUpdate(cmd._id, req.body);
    const updatedCmd = await DB.findById(cmd._id);
    (0, helper_1.fMs)(res, "Command updated successfully", updatedCmd);
};
exports.updateCommand = updateCommand;
const delCommand = async (req, res, next) => {
    let cmd = await DB.findById(req.params.id);
    if (!cmd) {
        next(new Error("Command not found with that id!"));
    }
    await DB.findByIdAndDelete(req.params.id);
    (0, helper_1.fMs)(res, "Command deleted successfully", []);
};
exports.delCommand = delCommand;
