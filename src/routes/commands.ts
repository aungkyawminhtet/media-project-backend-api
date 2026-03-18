import {
  createCommand,
  delCommand,
  getAllCommands,
  getCommandsById,
  updateCommand,
  getCommandsByPostId,
} from "../controllers/commands";
import { catSchema, commandSchema } from "../utls/schema";
import { validateParam, validateToken, validator } from "../utls/validator";

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
router.get("/", getAllCommands);

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
router.post(
  "/",
  validateToken,
  validator(commandSchema.bodySchema),
  createCommand,
);

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
  validateParam(catSchema.paramSchema, "id"),
  validateToken,
  getCommandsByPostId,
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
router.get("/:id", validateParam(catSchema.paramSchema, "id"), getCommandsById);

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
router.patch(
  "/:id",
  validateToken,
  validateParam(catSchema.paramSchema, "id"),
  updateCommand,
);

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
router.delete(
  "/:id",
  validateParam(catSchema.paramSchema, "id"),
  validateToken,
  delCommand,
);

// router.get("/", getAllCommands);
// router.post("/",validateToken,validator(commandSchema.bodySchema), createCommand);
// router.get("/byPost/:postId", getCommandsByPostId);

// router.route("/:id")
//     .get(validateParam(catSchema.paramSchema , "id"),getCommandsById)
//     .patch(validateToken, validateParam(catSchema.paramSchema, "id"), updateCommand)
//     .delete( validateParam(catSchema.paramSchema, "id"), validateToken, delCommand)

module.exports = router;
