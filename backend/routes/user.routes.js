import express from "express";

import UserController from "../controllers/user.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", UserController.register);
router.post("/auth", UserController.login);
router.post("/logout", protect, UserController.logout);

router
    .route("/profile")
    .get(protect, UserController.getProfile)
    .put(protect, UserController.updateUser);

router
    .route("/:id")
    .get(protect, admin, UserController.getUserById)
    .delete(protect, admin, UserController.deleteUser)
    .put(protect, admin, UserController.updateUser);

router.get("/", protect, admin, UserController.getUsers);

export default router;