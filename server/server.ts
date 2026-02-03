import { Request, Response } from "express";
import config from "./config/config.js";
import app from "./app.js";
import template from "./Template.js"
import connectDB from "./config/db.js";

const { PORT } = config;

connectDB().then(() => {
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send(template());
    })
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`)
    })
})
