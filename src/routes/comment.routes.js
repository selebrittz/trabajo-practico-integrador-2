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
import { createCommentValidations, updateCommentValidations } from "../middlewares/validations/comment.validator.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validationsAplicated } from "../middlewares/validator.js";

export const commentRoutes = Router();

commentRoutes.post("/comments", authMiddleware, createCommentValidations,createComment);
commentRoutes.get("/comments/article/:articleId", authMiddleware, validationsAplicated,getCommentsByArticle);
commentRoutes.get("/comments/my", authMiddleware, getMyComments);
commentRoutes.put("/comments/:id", authMiddleware, AdminMiddleware,updateCommentValidations, validationsAplicated, updateComment);
commentRoutes.delete("/comments/:id", authMiddleware, AdminMiddleware, ownerMiddleware, validationsAplicated, deleteComment);
