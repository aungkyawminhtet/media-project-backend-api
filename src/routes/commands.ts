import { createCommand, delCommand, getAllCommands, getCommandsById, updateCommand,getCommandsByPostId } from "../controllers/commands";
import { catSchema, commandSchema } from "../utls/schema";
import { validateParam, validateToken, validator } from "../utls/validator";

const router = require("express").Router();

router.get("/", getAllCommands);
router.post("/",validateToken,validator(commandSchema.bodySchema), createCommand);
router.get("/byPost/:postId", getCommandsByPostId);

router.route("/:id")
    .get(validateParam(catSchema.paramSchema , "id"),getCommandsById)
    .patch(validateToken, validateParam(catSchema.paramSchema, "id"), updateCommand)
    .delete( validateParam(catSchema.paramSchema, "id"), validateToken, delCommand)

module.exports = router;