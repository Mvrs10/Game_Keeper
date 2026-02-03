import { Router } from "express";
import controller from "../controllers/user.controller.js";

const router = Router();

router.param("userId", controller.userById)

router.get("/:userId/name", controller.getUserName);

export default router;

