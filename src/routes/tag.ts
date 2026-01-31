const router = require("express").Router();

import {
  GetAllTag,
  CreateTag,
  GetTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag";
import { saveFile } from "../utls/saveFiles";
import { catSchema, tagSchema } from "../utls/schema";
import { validateToken, validator, validateParam } from "../utls/validator";

router.get("/", GetAllTag);
router.post(
  "/",
  validateToken,
  saveFile,
  validator(tagSchema.bodySchema),
  CreateTag,
);

router
  .route("/:id")
  .get(validateParam(catSchema.paramSchema, "id"), GetTagById)
  .patch(validateParam(catSchema.paramSchema, "id"), updateTag)
  .delete(validateParam(catSchema.paramSchema, "id"), deleteTag);

module.exports = router;
