const router = require('express').Router();
import { getAllCats, getCatById, createCat, updateCat, drop } from "../controllers/cats";
import { saveFile } from "../utls/saveFiles";
import { validateParam, validator } from "../utls/validator";
import { catSchema } from "../utls/schema";


router.get("/", getAllCats);
router.post("/",[saveFile, validator(catSchema.bodySchema), createCat]);



router.route("/:id")
    .get(validateParam(catSchema.paramSchema,"id"),getCatById)
    .patch(saveFile,validateParam(catSchema.paramSchema,"id"),validator(catSchema.imageSchema),updateCat)
    .delete(validateParam(catSchema.paramSchema, "id"),drop)



module.exports = router;