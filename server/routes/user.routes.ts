import { Router } from "express";
import controller from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(controller.createUser).get(controller.getUsers);
router.param("userId", controller.getUserById);
router.get("/:userId/username", auth.requireLogin, controller.getUsername);
router.get("/:userId/games", auth.requireLogin, auth.hasAuthorization, controller.getUserGamesById);
router.delete("/:userId", auth.requireLogin, auth.hasAuthorization, controller.deleteUser);
export default router;

