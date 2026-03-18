"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const tag_1 = require("../controllers/tag");
const saveFiles_1 = require("../utls/saveFiles");
const schema_1 = require("../utls/schema");
const validator_1 = require("../utls/validator");
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management
 */
/**
 * @swagger
 * /api/v1/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get("/", tag_1.GetAllTag);
/**
 * @swagger
 * /api/v1/tags:
 *   post:
 *     summary: Create tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", validator_1.validateToken, saveFiles_1.saveFile, (0, validator_1.validator)(schema_1.tagSchema.bodySchema), tag_1.CreateTag);
/**
 * @swagger
 * /api/v1/tags/{id}:
 *   get:
 *     summary: Get tag by id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag detail
 */
router.get("/:id", (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), tag_1.GetTagById);
/**
 * @swagger
 * /api/v1/tags/{id}:
 *   patch:
 *     summary: Update tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch("/:id", validator_1.validateToken, (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), tag_1.updateTag);
/**
 * @swagger
 * /api/v1/tags/{id}:
 *   delete:
 *     summary: Delete tag
 *     tags: [Tags]
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
 *         description: Deleted successfully
 */
router.delete("/:id", validator_1.validateToken, (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), tag_1.deleteTag);
// router
//   .route("/:id")
//   .get(validateParam(catSchema.paramSchema, "id"), GetTagById)
//   .patch(validateParam(catSchema.paramSchema, "id"), updateTag)
//   .delete(validateParam(catSchema.paramSchema, "id"), deleteTag);
module.exports = router;
