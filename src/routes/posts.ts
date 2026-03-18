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
  toggleLike,
} from "../controllers/posts";

import { validateParam, validateToken, validator } from "../utls/validator";
import { AllSchema, catSchema, postSchema } from "../utls/schema";
import { saveFile } from "../utls/saveFiles";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */

router.get("/", [getAllPosts]);

/**
 * @swagger
 * /api/v1/posts/byCat/{catId}:
 *   get:
 *     summary: Get posts by category id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts filtered by category
 */
router.get("/byCat/:catId", getCatById);

/**
 * @swagger
 * /api/v1/posts/byUser/{userId}:
 *   get:
 *     summary: Get posts by user id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts filtered by user
 */
router.get("/byUser/:userId", getPostByUserId);

/**
 * @swagger
 * /api/v1/posts/byTag/{tagId}:
 *   get:
 *     summary: Get posts by tag id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts filtered by tag
 */
router.get("/byTag/:tagId", getPostByTag);

/**
 * @swagger
 * /api/v1/posts/like/toggle/{id}/{toggleLike}:
 *   patch:
 *     summary: Toggle post like count
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: toggleLike
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: 1 to increase like, 0 to decrease like
 *     responses:
 *       200:
 *         description: Like count updated
 */
router.patch(
  "/like/toggle/:id/:toggleLike",
  validateParam(catSchema.paramSchema, "id"),
  validateToken,
  toggleLike,
);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cat
 *               - tag
 *               - photo
 *               - name
 *               - desc
 *               - title
 *             properties:
 *               cat:
 *                 type: string
 *               tag:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 */
router.post("/", [
  validateToken,
  saveFile,
  validator(postSchema.bodySchema),
  createPost,
]);

/**
 * @swagger
 * /api/v1/posts/paginate/{page}:
 *   get:
 *     summary: Get paginated posts
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Paginated post list
 */
router.get("/paginate/:page", [
  validateParam(AllSchema.pageSchema, "page"),
  getPagination,
]);

router
  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   get:
   *     summary: Get post by id
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Post details with commands
   */
  .route("/:id")
  .get(validateParam(catSchema.paramSchema, "id"), getPostById)
  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   patch:
   *     summary: Update post by id
   *     tags: [Posts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               cat:
   *                 type: string
   *               tag:
   *                 type: string
   *               photo:
   *                 type: string
   *               name:
   *                 type: string
   *               desc:
   *                 type: string
   *               title:
   *                 type: string
   *     responses:
   *       200:
   *         description: Post updated successfully
   */
  .patch(validateToken, updatePost)
  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   delete:
   *     summary: Delete post by id
   *     tags: [Posts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Post deleted successfully
   */
  .delete(
    validateToken,
    validateParam(catSchema.paramSchema, "id"),
    deletePost,
  );

module.exports = router;
