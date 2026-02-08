import { NextFunction, Request, Response } from "express";
import service from "../services/user.service.js";
import AppError from "../errors/AppError.js";

const createUser = async (req: Request, res: Response) => {
    try {
        const id = await service.createUser(req.body);
        return res.status(201).location(`/api/users/${id}`).json({id, message: "User is successfully created" });
    } catch (err) {
        console.log(err);
        if (err instanceof AppError){
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ err: "Unexpected server error" });     
    }
}

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

const getUsername = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({ message: "Unable to load user" })
    }

    res.json({ username: req.user.username });
}

const getUserGamesById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;
        const games = await service.getUserGamesById(userId);
        res.status(200).json(games);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        console.log(err);
        res.status(500).json({ error: "Unexpected server error" });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId as string;
        const deletedUser = await service.deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (err) {
        if (err instanceof AppError){
            return res.status(err.statusCode).json({error: err.message});
        }
        return res.status(500).json({ err: "Unexpected server error" });
    }
}

export default { createUser, userById, getUsername, getUserGamesById, deleteUser }
