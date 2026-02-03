import dotenv from "dotenv";

dotenv.config({path: "./config/.env"});

interface IConfiguration {
    NODE_ENV: string,
    PORT: string,
    MONGO_URI: string,
    DB_NAME: string,
}

const config : IConfiguration = {
    NODE_ENV : process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI || "",
    DB_NAME: process.env.DB_NAME || "test"
}

export default config;