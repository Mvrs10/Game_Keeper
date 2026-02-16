import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({path: "./config/.env"});
}

//dotenv.config({path: "./config/.env"});

interface IConfiguration {
    NODE_ENV: string,
    PORT: string,
    MONGO_URI: string,
    DB_NAME: string,
    JWT_SECRET: string,
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not set");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const config : IConfiguration = {
    NODE_ENV : process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI,
    DB_NAME: process.env.DB_NAME || "test",
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;