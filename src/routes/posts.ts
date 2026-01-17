import express, { Request, Response } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, getCatById, getPostByUserId } from '../controllers/posts';
import { validateToken, validator } from '../utls/validator';
import { postSchema } from '../utls/schema';
import { saveFile } from '../utls/saveFiles';

const router = express.Router();

router.get("/", [getAllPosts]);

router.get("/byCat/:catId", getCatById);
router.get("/byUser/:userId", getPostByUserId);

router.post("/", [validateToken, saveFile, validator(postSchema.bodySchema), createPost]);

router.route("/:id")
    .get(getPostById)
    .patch(validateToken, updatePost)
    .delete(validateToken,deletePost);

module.exports = router;