import express from "express";
import { createGroup, joinGroup, getUserGroups } from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", createGroup);
router.post("/:groupId/join", joinGroup);
router.get("/user/:userId", getUserGroups); // ✅ New route to fetch user's groups

export default router;
