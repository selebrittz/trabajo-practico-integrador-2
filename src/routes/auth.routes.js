import { Router } from "express";
import { 
    register,
     login,
     logout,
     profile,
     updateProfile} from "../controllers/auth.controller.js";


export const userRoutes = Router()

userRoutes.post( "/register", register);

userRoutes.post( "/login", login);

userRoutes.get("/profile", profile);

userRoutes.put("/profile",updateProfile);

userRoutes.post ("/logout", logout);