import { Router } from "express";   

import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle
 } from "../controllers/article.controller..js";


export const articleRoutes = Router();

