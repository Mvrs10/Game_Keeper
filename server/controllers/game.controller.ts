import { Request, Response } from "express";
import service from "../services/game.service.js";
import AppError from "../errors/AppError.js";

const getGames = async (req: Request, res: Response) => {
    try {
        const games = await service.getGames();
        res.status(200).json(games);
    } catch {
        res.status(500).json({ error: "Unexpected server error" });
    }
}

const searchGames = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;
        const games = await service.searchGames(q);
        res.status(200).json(games);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Unexpected server error" });
    }
}

export default { getGames, searchGames }