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

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

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
// app.use("/orders", orderRoutes(io));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("placeOrder", (order) => {
    console.log("Order received:", order);
    io.emit("orderUpdate", order);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
