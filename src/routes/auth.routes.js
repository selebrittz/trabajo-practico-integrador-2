import { Router } from "express";
import { 
    register,
     login,
     logout,
     updateProfile,
     getProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const userRoutes = Router()

//rutas publicas
userRoutes.post( "/register", register);

userRoutes.post( "/login", login);

//rutas privadas
userRoutes.get("/profile",authMiddleware, getProfile);

userRoutes.put("/profile",authMiddleware, updateProfile);

userRoutes.post ("/logout",authMiddleware, logout);