import { Router } from "express";
import { 
    register,
     login,
     logout} from "../controllers/auth.controller.js";


export const userRoutes = Router()

userRoutes.post( "/register", register);

userRoutes.post( "/login", login);

userRoutes.post ("/logout", logout);