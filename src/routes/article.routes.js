import { Router } from "express";   

import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle
 } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AdminMiddleware } from "../middlewares/admin.middleware.js";
import { createArticleValidations, updateValidationArticle } from "../middlewares/validations/article.validator.js";
import { validationsAplicated } from "../middlewares/validator.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";



export const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, createArticleValidations,validationsAplicated, createArticle);
articleRoutes.get("/articles", authMiddleware, getAllArticles);
articleRoutes.get("/articles/:id", authMiddleware,validationsAplicated,getArticleById);
articleRoutes.put("/articles/:id", authMiddleware, AdminMiddleware, ownerMiddleware ,updateValidationArticle, validationsAplicated , updateArticle);
articleRoutes.delete("/articles/:id", authMiddleware, AdminMiddleware, ownerMiddleware, validationsAplicated,deleteArticle);