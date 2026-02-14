import { Request, Response } from "express";
import service from "../services/auth.service.js"
import AppError from "../errors/AppError.js";

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await service.login(username, password);
        res.cookie('t', token, { expires: new Date(2036,0,1) });
        res.status(200).json({ token });
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        res.status(500).json({ error: "Unexpected server error" });
    }
}

const logout = async (_req: Request, res: Response) => {
    res.clearCookie("t");
    return res.status(200).json({message: "Successfully log out"})
}

export default { login, logout }