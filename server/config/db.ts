import mongoose from "mongoose";
import config from "./config.js";

const { MONGO_URI, DB_NAME } = config;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI as string, {dbName : DB_NAME});
        console.log("Successfully connected to MongoDB.");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB.", err);
        process.exit(1);
    }
};

export default connectDB;