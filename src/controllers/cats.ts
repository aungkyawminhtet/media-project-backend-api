import { NextFunction, Request, Response } from "express";
import { fMs } from "../utls/helper";
const Db = require("../dbs/cats");

const getAllCats = async(req: Request, res: Response, next: NextFunction)=> {
    const cats = await Db.find();
    fMs(res, "All cats fetched successfully", cats);
}

const getCatById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const cat = await Db.findById(id);

    fMs(res, "Cat fetched successfully", cat);
}

const createCat = async(req: Request, res: Response, next: NextFunction) => {
    // console.log("dataaa", req);
    const cats = await Db.findOne({name: req.body.name});
    if(cats) {
        next(new Error("Cat already exists"));
    }
    const cat = await new Db(req.body).save();
    fMs(res, "Cat created successfully", cat);
}

const updateCat = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const cat = await Db.findById(id);
    if(!cat) {
        return next(new Error("Cat not found"));
    }

    await Db.findByIdAndUpdate(cat._id, req.body);
    const updatedCat = await Db.findById(cat._id);
    fMs(res, "Cat updated successfully", updatedCat);
}

const drop = async(req: Request, res: Response, next: NextFunction) => {
    await Db.findByIdAndDelete(req.params.id);

    fMs(res, "Cat deleted successfully", []);
}

export {
    getAllCats,
    getCatById,
    createCat,
    updateCat,
    drop
}