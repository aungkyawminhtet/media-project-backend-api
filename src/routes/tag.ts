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
router.get("/", GetAllTag);

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
router.post(
  "/",
  validateToken,
  saveFile,
  validator(tagSchema.bodySchema),
  CreateTag,
);

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
router.get("/:id", validateParam(catSchema.paramSchema, "id"), GetTagById);

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
router.patch(
  "/:id",
  validateToken,
  validateParam(catSchema.paramSchema, "id"),
  updateTag,
);

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
router.delete(
  "/:id",
  validateToken,
  validateParam(catSchema.paramSchema, "id"),
  deleteTag,
);

// router
//   .route("/:id")
//   .get(validateParam(catSchema.paramSchema, "id"), GetTagById)
//   .patch(validateParam(catSchema.paramSchema, "id"), updateTag)
//   .delete(validateParam(catSchema.paramSchema, "id"), deleteTag);

module.exports = router;
