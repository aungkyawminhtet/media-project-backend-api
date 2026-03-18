"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../controllers/commands");
const schema_1 = require("../utls/schema");
const validator_1 = require("../utls/validator");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Commands
 *   description: Commands management
 */
/**
 * @swagger
 * /api/v1/commands:
 *   get:
 *     summary: Get all commands
 *     tags: [Commands]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", commands_1.getAllCommands);
/**
 * @swagger
 * /api/v1/commands:
 *   post:
 *     summary: Create new command
 *     tags: [Commands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post
 *               - name
 *               - email
 *               - context
 *             properties:
 *               post:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               context:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created successfully
 */
router.post("/", validator_1.validateToken, (0, validator_1.validator)(schema_1.commandSchema.bodySchema), commands_1.createCommand);
/**
 * @swagger
 * /api/v1/commands/byPost/{postId}:
 *   get:
 *     summary: Get commands by post id
 *     tags: [Commands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/byPost/:postId", [
    (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"),
    validator_1.validateToken,
    commands_1.getCommandsByPostId,
]);
/**
 * @swagger
 * /api/v1/commands/{id}:
 *   get:
 *     summary: Get command by id
 *     tags: [Commands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), commands_1.getCommandsById);
/**
 * @swagger
 * /api/v1/commands/{id}:
 *   patch:
 *     summary: Update command
 *     tags: [Commands]
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
 *             required:
 *               - post
 *               - name
 *               - email
 *               - context
 *             properties:
 *               post:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               context:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 context:
 *                   type: string
 */
router.patch("/:id", validator_1.validateToken, (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), commands_1.updateCommand);
/**
 * @swagger
 * /api/v1/commands/{id}:
 *   delete:
 *     summary: Delete command
 *     tags: [Commands]
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
router.delete("/:id", (0, validator_1.validateParam)(schema_1.catSchema.paramSchema, "id"), validator_1.validateToken, commands_1.delCommand);
// router.get("/", getAllCommands);
// router.post("/",validateToken,validator(commandSchema.bodySchema), createCommand);
// router.get("/byPost/:postId", getCommandsByPostId);
// router.route("/:id")
//     .get(validateParam(catSchema.paramSchema , "id"),getCommandsById)
//     .patch(validateToken, validateParam(catSchema.paramSchema, "id"), updateCommand)
//     .delete( validateParam(catSchema.paramSchema, "id"), validateToken, delCommand)
module.exports = router;
