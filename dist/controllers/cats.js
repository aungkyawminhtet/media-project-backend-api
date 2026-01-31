"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop = exports.updateCat = exports.createCat = exports.getCatById = exports.getAllCats = void 0;
const helper_1 = require("../utls/helper");
const Db = require("../dbs/cats");
const getAllCats = async (req, res, next) => {
    const cats = await Db.find();
    (0, helper_1.fMs)(res, "All cats fetched successfully", cats);
};
exports.getAllCats = getAllCats;
const getCatById = async (req, res, next) => {
    const id = req.params.id;
    const cat = await Db.findById(id);
    (0, helper_1.fMs)(res, "Cat fetched successfully", cat);
};
exports.getCatById = getCatById;
const createCat = async (req, res, next) => {
    // console.log("dataaa", req);
    const cats = await Db.findOne({ name: req.body.name });
    if (cats) {
        next(new Error("Cat already exists"));
    }
    const cat = await new Db(req.body).save();
    (0, helper_1.fMs)(res, "Cat created successfully", cat);
};
exports.createCat = createCat;
const updateCat = async (req, res, next) => {
    const id = req.params.id;
    const cat = await Db.findById(id);
    if (!cat) {
        return next(new Error("Cat not found"));
    }
    await Db.findByIdAndUpdate(cat._id, req.body);
    const updatedCat = await Db.findById(cat._id);
    (0, helper_1.fMs)(res, "Cat updated successfully", updatedCat);
};
exports.updateCat = updateCat;
const drop = async (req, res, next) => {
    await Db.findByIdAndDelete(req.params.id);
    (0, helper_1.fMs)(res, "Cat deleted successfully", []);
};
exports.drop = drop;
