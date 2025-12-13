import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", UserController.register);

router.post("/auth", UserController.login);

export default router;