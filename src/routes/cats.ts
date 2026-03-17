const router = require('express').Router();
import { getAllCats, getCatById, createCat, updateCat, drop } from "../controllers/cats";
import { saveFile } from "../utls/saveFiles";
import { validateParam, validator, validateToken } from '../utls/validator';
import { catSchema } from "../utls/schema";


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

router.get("/", getAllCats);


/** 
 * @swagger
 * /api/vi/cats:
 *   post:
 *     summary: Create a new cat
 *     tags: [Cats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - name
 *             properties:
 *               image:
 *                 type: string
 *               name:
 *                  type: string
 * 
 *     responses:
 *       200:
 *         description: Cat created successfully
 */
router.post("/",[validateToken, saveFile, validator(catSchema.bodySchema), createCat]);


/**
 * @swagger
 * /api/v1/cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     tags: [Cats]
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
router.get("/:id",validateParam(catSchema.paramSchema, "id"),validateToken, getCatById);

/**
 * @swagger
 * /api/v1/cats/{id}:
 *   patch:
 *     summary: Update a cat by ID
 *     tags: [Cats]
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - name
 *             properties:
 *               image: 
 *                 type: string
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


router.patch("/:id", [validateToken, saveFile, validateParam(catSchema.paramSchema, "id"),validateToken, updateCat]);

/**
 * @swagger
 * /api/v1/cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     tags: [Cats]
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

router.delete("/:id", [validateToken, validateParam(catSchema.paramSchema, "id"), drop]);

// router.route("/:id")
//     .get(validateParam(catSchema.paramSchema,"id"),getCatById)
//     .patch(validateToken, saveFile,validateParam(catSchema.paramSchema,"id"),validator(catSchema.imageSchema),updateCat)
//     .delete(validateToken, validateParam(catSchema.paramSchema, "id"), drop)



module.exports = router;