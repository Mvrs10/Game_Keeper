import app from "../server/app.js";
import connectDB from "../server/config/db.js";

connectDB();

export default app;