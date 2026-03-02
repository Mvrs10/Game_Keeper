import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";

import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.route.js";
import "./models/user.js";
import "./models/game.js";

const app: Application = express();

const corsOptions = {
    origin: ["https://studio.apollographql.com", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    // exposedHeaders: ['Authorization'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

// Global middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// // 1. Define your GraphQL Schema (Types and Resolvers)
// const typeDefs = `#graphql
//   type Game {
//     id: ID
//     title: String
//   }
//   type Query {
//     games: [Game]
//   }
// `;

// const resolvers = {
//   Query: {
//     games: () => [{ id: "1", title: "Example Game" }],
//   },
// };

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

await apolloServer.start();

// GraphQL
app.use('/graphql',
  cors(corsOptions),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      try {
        const token =
          req.cookies.t ||
          req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) return { user: null };

        const decoded = jwt.verify(
          token,
          config.JWT_SECRET
        ) as JwtPayload & { _id: string; username: string };

        return {
          user: {
            _id: decoded._id,
            username: decoded.username,
          },
        };
      } catch {
        return { user: null };
      }
    },
  }));

// REST
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/games/", gameRoutes);

export default app;