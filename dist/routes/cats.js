"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const cats_1 = require("../controllers/cats");
const saveFiles_1 = require("../utls/saveFiles");
const validator_1 = require("../utls/validator");
const schema_1 = require("../utls/schema");
/**
 * @swagger
 * tags:
 *   name: Cats
 *   description: Cat management
 */
/**
 * @swagger
 * /api/v1/cats:
 *   get:
 *     summary: Get all cats
 *     tags: [Cats]
 *
 *     responses:
 *       200:
 *         description: a list of cats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cats:
 *                   type: array
 *                   required: true
 *                   description: a list of cats
 *                   items:
 *                     type: object
 *                     required:
 *                       - name
 *                       - image
 *                       - user
 *                     properties:
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       user:
 *                         type: string
 */
router.get("/", cats_1.getAllCats);
/**
 * @swagger
 * /api/v1/cats:
 *   post:
 *     summary: Create a new cat
 *     tags: [Cats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *               - name
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               name:
 *                  type: string
 *
 *     responses:
 *       200:
 *         description: Cat created successfully
 */
router.post("/", [
    validator_1.validateToken,
    saveFiles_1.saveFile,
    (0, validator_1.validator)(schema_1.catSchema.bodySchema),
    cats_1.createCat,
]);
/**
 * @swagger
 * /api/v1/cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     tags: [Cats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cat ID
 *     responses:
 *       200:
 *         description: Cat fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - image
 *                 - user
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 user:
 *                   type: string
 */
router.get("/:id", (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), validator_1.validateToken, cats_1.getCatById);
/**
 * @swagger
 * /api/v1/cats/{id}:
 *   patch:
 *     summary: Update a cat by ID
 *     tags: [Cats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cat ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - image
 *                 - user
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 user:
 *                   type: string
 */
router.patch("/:id", [
    validator_1.validateToken,
    saveFiles_1.saveFile,
    (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"),
    validator_1.validateToken,
    cats_1.updateCat,
]);
/**
 * @swagger
 * /api/v1/cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     tags: [Cats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cat ID
 *     responses:
 *       200:
 *         description: Cat deleted successfully
 */
router.delete("/:id", [
    validator_1.validateToken,
    (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"),
    cats_1.drop,
]);
// router.route("/:id")
//     .get(validateParam(catSchema.paramSchema,"id"),getCatById)
//     .patch(validateToken, saveFile,validateParam(catSchema.paramSchema,"id"),validator(catSchema.imageSchema),updateCat)
//     .delete(validateToken, validateParam(catSchema.paramSchema, "id"), drop)
module.exports = router;
