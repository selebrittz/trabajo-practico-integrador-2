import { Router } from "express";
import { 
  createTag, 
  getTags, 
  getTagById, 
  updateTag, 
  deleteTag 
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AdminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRoutes = Router();


tagRoutes.post("/tags", authMiddleware, AdminMiddleware, createTag);
tagRoutes.get("/tags", authMiddleware, getTags);
tagRoutes.get("/tags/:id", authMiddleware, getTagById);
tagRoutes.put("/tags/:id", authMiddleware, AdminMiddleware, updateTag);
tagRoutes.delete("/tags/:id", authMiddleware, AdminMiddleware, deleteTag);
