import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createComment,
  getCommentsByArticle,
  getMyComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { AdminMiddleware } from "../middlewares/admin.middleware.js";

export const commentRoutes = Router();

commentRoutes.post("/comments", authMiddleware, createComment);
commentRoutes.get("/comments/article/:articleId", authMiddleware, getCommentsByArticle);
commentRoutes.get("/comments/my", authMiddleware, getMyComments);
commentRoutes.put("/comments/:id", authMiddleware, AdminMiddleware, updateComment);
commentRoutes.delete("/comments/:id", authMiddleware, AdminMiddleware, deleteComment);
