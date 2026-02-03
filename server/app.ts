import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

// todo app.use test route
app.use("/api/users/", userRoutes);

export default app;