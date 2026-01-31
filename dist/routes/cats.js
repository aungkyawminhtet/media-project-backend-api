"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const cats_1 = require("../controllers/cats");
const saveFiles_1 = require("../utls/saveFiles");
const validator_1 = require("../utls/validator");
const schema_1 = require("../utls/schema");
router.get("/", cats_1.getAllCats);
router.post("/", [saveFiles_1.saveFile, (0, validator_1.validator)(schema_1.catSchema.bodySchema), cats_1.createCat]);
router.route("/:id")
    .get((0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), cats_1.getCatById)
    .patch(saveFiles_1.saveFile, (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), (0, validator_1.validator)(schema_1.catSchema.imageSchema), cats_1.updateCat)
    .delete((0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), cats_1.drop);
module.exports = router;
