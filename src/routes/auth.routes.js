import { Router } from "express";
import { 
    register,
     login,
     logout,
     updateProfile,
     getProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserValidations, ProfileValidations } from "../middlewares/validations/auth.validator.js";
import { validationsAplicated } from "../middlewares/validator.js";



export const authRoutes = Router()

//rutas publicas
authRoutes.post( "/register", createUserValidations, register);

authRoutes.post( "/login", login);

//rutas privadas
authRoutes.get("/profile",authMiddleware, getProfile);

authRoutes.put("/profile",authMiddleware, ProfileValidations, validationsAplicated ,updateProfile);

authRoutes.post ("/logout",authMiddleware, logout);