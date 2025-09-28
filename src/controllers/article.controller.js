import { ArticleModel } from "../models/articles.model.js";
import { TagModel } from "../models/tag.model.js";

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

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author") // trae info completa del autor
      .populate("tags");  // trae info completa de las etiquetas
    res.status(200).json({ ok: true, data: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("author")
      .populate("tags");

    if (!article) {
      return res.status(404).json({ ok: false, msg: "Artículo no encontrado" });
    }

    res.status(200).json({ ok: true, data: article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ author: req.user.id })
      .populate("author")
      .populate("tags");
    res.status(200).json({ ok: true, data: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ ok: false, msg: "Artículo no encontrado" });
    }

    const { title, content, tags } = req.body;
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    ).populate("author").populate("tags");

    res.status(200).json({ ok: true, msg: "Artículo actualizado", data: updatedArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ ok: false, msg: "Artículo no encontrado" });
    }

    await ArticleModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ ok: true, msg: "Artículo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};