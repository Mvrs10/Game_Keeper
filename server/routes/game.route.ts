import { Router } from "express";
import controller from "../controllers/game.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", controller.getGames);
router.get("/search", controller.searchGames);

export default router;