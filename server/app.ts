import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import "./models/user.js";
import "./models/game.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/users/", userRoutes);

export default app;