import { Router } from "express";
import { register, login} from "../controllers/auth.controller.js";


export const userRoutes = Router()

userRoutes.post( "/register", register);
userRoutes.post( "/login", login);