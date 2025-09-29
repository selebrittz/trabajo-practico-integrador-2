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
import { createTagValidations, updateTagValidations } from "../middlewares/validations/tag.validator.js";
import { validationsAplicated } from "../middlewares/validator.js";

export const tagRoutes = Router();


tagRoutes.post("/tags", authMiddleware, AdminMiddleware, createTagValidations, validationsAplicated ,createTag);
tagRoutes.get("/tags", authMiddleware, getTags);
tagRoutes.get("/tags/:id", authMiddleware, validationsAplicated,getTagById);
tagRoutes.put("/tags/:id", authMiddleware, AdminMiddleware, updateTagValidations, validationsAplicated ,updateTag);
tagRoutes.delete("/tags/:id", authMiddleware, AdminMiddleware, validationsAplicated ,deleteTag);
