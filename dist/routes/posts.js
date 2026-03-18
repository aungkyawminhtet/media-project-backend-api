"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const validator_1 = require("../utls/validator");
const schema_1 = require("../utls/schema");
const saveFiles_1 = require("../utls/saveFiles");
const router = express_1.default.Router();
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
router.get("/", [posts_1.getAllPosts]);
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
router.get("/byCat/:catId", posts_1.getCatById);
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
router.get("/byUser/:userId", posts_1.getPostByUserId);
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
router.get("/byTag/:tagId", posts_1.getPostByTag);
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
router.patch("/like/toggle/:id/:toggleLike", (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), validator_1.validateToken, posts_1.toggleLike);
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
    validator_1.validateToken,
    saveFiles_1.saveFile,
    (0, validator_1.validator)(schema_1.postSchema.bodySchema),
    posts_1.createPost,
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
    (0, validator_1.validateParam)(schema_1.AllSchema.pageSchema, "page"),
    posts_1.getPagination,
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
    .get((0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), posts_1.getPostById)
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
    .patch(validator_1.validateToken, posts_1.updatePost)
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
    .delete(validator_1.validateToken, (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), posts_1.deletePost);
module.exports = router;
