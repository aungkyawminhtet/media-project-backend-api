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
router.get("/", [posts_1.getAllPosts]);
router.get("/byCat/:catId", posts_1.getCatById);
router.get("/byUser/:userId", posts_1.getPostByUserId);
router.post("/", [validator_1.validateToken, saveFiles_1.saveFile, (0, validator_1.validator)(schema_1.postSchema.bodySchema), posts_1.createPost]);
router.route("/:id")
    .get(posts_1.getPostById)
    .patch(validator_1.validateToken, posts_1.updatePost)
    .delete(validator_1.validateToken, posts_1.deletePost);
module.exports = router;
