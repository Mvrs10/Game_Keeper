import { Router } from "express";
import controller from "../controllers/user.controller.js";

const router = Router();

router.route("/").post(controller.createUser)
router.param("userId", controller.userById)
router.get("/:userId/username", controller.getUsername);
router.get("/:userId/games", controller.getUserGamesById)
router.delete("/:userId", controller.deleteUser)
export default router;

