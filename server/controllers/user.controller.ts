import { Request, Response } from "express";
import { getUserNameById } from "../services/user.service.js";

export const getUserName = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const name = await getUserNameById(id);

        if (!name){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({name});
    }
    catch (err) {
        res.status(400).json({message: "Invalid user id"});
    }
}
