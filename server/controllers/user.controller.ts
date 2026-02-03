import { NextFunction, Request, Response } from "express";
import service from "../services/user.service.js";

const userById = async (req: Request, res: Response, next: NextFunction, id: string) => {
    try {
        const user = await service.getUserById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid user id" })
    }
}

const getUserName = async(req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({ message: "Unable to load user"})
    }

    res.json({ username: req.user.username })
}

export default { userById, getUserName }
