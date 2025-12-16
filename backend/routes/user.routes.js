import express from "express";

import UserController from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", UserController.register);
router.post("/auth", UserController.login);

router.post("/logout", protect, UserController.logout);
router.get("/profile", protect, UserController.getProfile);

export default router;