import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.route.js";
import "./models/user.js";
import "./models/game.js";

const app: Application = express();

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://game-keeper.vercel.app/" : "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // exposedHeaders: ['Authorization'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/games/", gameRoutes);

export default app;