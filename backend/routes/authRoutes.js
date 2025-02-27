import express from "express";
import {
  googleAuth,
  googleCallback,
  handleCallback,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, handleCallback);
router.get("/logout", logout);

export default router;
