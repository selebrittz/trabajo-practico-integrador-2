import { commentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content, article } = req.body;

    const newComment = await commentModel.create({
      content,
      article,
      author: req.user.id, // usuario logueado
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear comentario", error });
  }
};


export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await commentModel.find({ article: articleId })
      .populate("author", "username email");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener comentarios", error });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const comments = await commentModel.find({ author: req.user.id })
      .populate("article", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener mis comentarios", error });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comentario no encontrado" });

    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar comentario", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comentario no encontrado" });

    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await comment.deleteOne();
    res.json({ msg: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar comentario", error });
  }
};
