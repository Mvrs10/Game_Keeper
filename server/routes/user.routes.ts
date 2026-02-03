import { Router } from "express";
import { getUserName } from "../controllers/user.controller.js";

const router = Router();

router.get("/:id/username", getUserName);

export default router;

