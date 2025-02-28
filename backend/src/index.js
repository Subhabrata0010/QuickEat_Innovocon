import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import passport from "../config/passport-config.js";
// import cookieSession from "cookie-session";
import authRoutes from "../routes/authRoutes.js";
import connectDB from "../db/db.js";
// import orderRoutes from "../routes/orderRoutes.js";
import session from "express-session";
import groupRoutes from "../routes/groupRoutes.js";
import awsServerlessExpress from "aws-serverless-express";

dotenv.config();

connectDB();

const app = express();
const server = awsServerlessExpress.createServer(app);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
// app.use("/orders", orderRoutes(io));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
