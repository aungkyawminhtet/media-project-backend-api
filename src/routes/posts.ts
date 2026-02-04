import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCatById,
  getPostByUserId,
  getPagination,
  getPostByTag,
  addLike,
  removeLike,
} from "../controllers/posts";

import { validateParam, validateToken, validator } from "../utls/validator";
import { catSchema, postSchema } from "../utls/schema";
import { saveFile } from "../utls/saveFiles";

const router = express.Router();

router.get("/", [getAllPosts]);

router.get("/byCat/:catId", getCatById);
router.get("/byUser/:userId", getPostByUserId);
router.get("/byTag/:tagId", getPostByTag);

router.get(
  "/like/add/:id",
  validateParam(catSchema.paramSchema, "id"),
  validateToken,
  addLike,
);
router.get(
  "/like/remove/:id",
  validateParam(catSchema.paramSchema, "id"),
  validateToken,
  removeLike,
);

router.post("/", [
  validateToken,
  saveFile,
  validator(postSchema.bodySchema),
  createPost,
]);

router.get("/paginate/:page", getPagination);

router
  .route("/:id")
  .get(validateParam(catSchema.paramSchema, "id"), getPostById)
  .patch(validateToken, updatePost)
  .delete(
    validateToken,
    validateParam(catSchema.paramSchema, "id"),
    deletePost,
  );

module.exports = router;
