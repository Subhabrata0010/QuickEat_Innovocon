import express from "express";
import { createGroup, joinGroup } from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", createGroup); // Create a new group
router.post("/:groupId/join", joinGroup); // Join a group using groupId

export default router;
