import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";
import AppError from "../errors/AppError.js";

const requireLogin = ( req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.t || req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token) throw new AppError(401, "Access denied");

        const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload & { _id: string, username: string };
        req.user = { _id: decoded._id, username: decoded.username };
        next();
    } catch (err) {
        if (err instanceof AppError) throw err;
        res.status(401).json({ error: "Invalid token" });
    }
}

export const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const loggedInUserId = req.user?._id;
  const profileUserId = req.params.userId;

  if (loggedInUserId !== profileUserId) {
    return res.status(403).json({ error: "User is not authorized" });
  }

  next();
};

export default { requireLogin, hasAuthorization }