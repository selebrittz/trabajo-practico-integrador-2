import { ArticleModel } from "../models/articles.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = new ArticleModel({
      title,
      content,
      tags,
      author: req.user._id, 
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear artículo", error });
  }
};