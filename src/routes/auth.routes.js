import { Router } from "express";
import { 
    register,
     login,
     logout,
     updateProfile,
     getProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const authRoutes = Router()

//rutas publicas
authRoutes.post( "/register", register);

authRoutes.post( "/login", login);

//rutas privadas
authRoutes.get("/profile",authMiddleware, getProfile);

authRoutes.put("/profile",authMiddleware, updateProfile);

authRoutes.post ("/logout",authMiddleware, logout);