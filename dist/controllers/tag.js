"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.GetTagById = exports.CreateTag = exports.GetAllTag = void 0;
const DB = require("../dbs/tag");
const helper_1 = require("../utls/helper");
const GetAllTag = async (req, res, next) => {
    const tags = await DB.find();
    (0, helper_1.fMs)(res, "All tag fetched Successfully", tags);
};
exports.GetAllTag = GetAllTag;
const GetTagById = async (req, res, next) => {
    const id = req.params.id;
    const tag = await DB.findById(id);
    if (!tag) {
        next(new Error("Tag not found"));
    }
    (0, helper_1.fMs)(res, "Tag fetched successfully", tag);
};
exports.GetTagById = GetTagById;
const CreateTag = async (req, res, next) => {
    const tag = await DB.findOne({ name: req.body.name });
    if (tag) {
        next(new Error("Tag already exists"));
    }
    const newTag = await new DB(req.body).save();
    (0, helper_1.fMs)(res, "Tag created successfully", newTag);
};
exports.CreateTag = CreateTag;
const updateTag = async (req, res, next) => {
    let id = req.params.id;
    const user = await DB.findById(id);
    if (!user) {
        next(new Error("Tag not found"));
    }
    await DB.findByIdAndUpdate(user._id, req.body);
    const updatedTag = await DB.findById(user._id);
    (0, helper_1.fMs)(res, "Tag updated successfully", updatedTag);
};
exports.updateTag = updateTag;
const deleteTag = async (req, res, next) => {
    let id = req.params.id;
    await DB.findByIdAndDelete(id);
    (0, helper_1.fMs)(res, "Tag deleted successfully", []);
};
exports.deleteTag = deleteTag;
