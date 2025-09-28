import { Router } from "express";   

import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle
 } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AdminMiddleware } from "../middlewares/admin.middlware.js";


export const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware,createArticle);
articleRoutes.get("/articles", authMiddleware, getAllArticles);
articleRoutes.get("/articles/:id", authMiddleware,getArticleById);
articleRoutes.put("/articles/:id", authMiddleware, AdminMiddleware, updateArticle);
articleRoutes.delete("/articles/:id", authMiddleware, AdminMiddleware,deleteArticle);