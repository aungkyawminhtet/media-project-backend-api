const router = require('express').Router();
import { getAllCats, getCatById, createCat, updateCat, drop } from "../controllers/cats";
import { saveFile } from "../utls/saveFiles";
import { validateParam, validator, validateToken } from '../utls/validator';
import { catSchema } from "../utls/schema";


router.get("/", getAllCats);
router.post("/",[validateToken, saveFile, validator(catSchema.bodySchema), createCat]);


router.route("/:id")
    .get(validateParam(catSchema.paramSchema,"id"),getCatById)
    .patch(validateToken, saveFile,validateParam(catSchema.paramSchema,"id"),validator(catSchema.imageSchema),updateCat)
    .delete(validateToken, validateParam(catSchema.paramSchema, "id"), drop)



module.exports = router;