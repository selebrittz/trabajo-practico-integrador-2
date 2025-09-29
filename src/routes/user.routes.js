import { Router } from "express";

import { 
    deleteUser,
    getUserById,
    getUsers } from "../controllers/user.controller.js";
import { AdminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { updateUserValidations } from "../middlewares/validations/user.validator.js";

export const userRoutes = Router();

userRoutes.get("/users",authMiddleware,AdminMiddleware, getUsers);
userRoutes.get("/users/:id",authMiddleware,AdminMiddleware, getUserById);
userRoutes.put("/users/:id", authMiddleware, AdminMiddleware, updateUserValidations, updateProfile);
userRoutes.delete("/users/:id", authMiddleware, AdminMiddleware, deleteUser);
