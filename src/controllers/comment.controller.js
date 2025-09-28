import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    // extraemos el contenido y el artículo del body de la petición
    const { content, article } = req.body;

    // creamos un nuevo comentario asociando automáticamente el usuario logueado
    const newComment = await CommentModel.create({
      content,
      article,
      author: req.user.id, // usuario logueado
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear comentario", error });
  }
};

// listar comentarios de un artículo
export const getCommentsByArticle = async (req, res) => {
  try {
    // obtenemos el id del artículo de los parámetros de la URL
    const { articleId } = req.params;

    // buscamos todos los comentarios que pertenezcan a ese artículo
    // y poblamos la información del autor (solo username y email)
    const comments = await CommentModel.find({ article: articleId })
      .populate("author", "username email");

    // respondemos con los comentarios encontrados
    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener comentarios", error });
  }
};

// listar comentarios del usuario logueado
export const getMyComments = async (req, res) => {
  try {
    // buscamos todos los comentarios donde el author sea el usuario logueado
    // y poblamos el título del artículo asociado
    const comments = await CommentModel.find({ author: req.user.id })
      .populate("article", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener mis comentarios", error });
  }
};

// actualizar comentario
export const updateComment = async (req, res) => {
  try {
    // obtenemos el id del comentario de los parámetros y el nuevo contenido del body
    const { id } = req.params;
    const { content } = req.body;

    // buscamos el comentario por ID
    const comment = await CommentModel.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comentario no encontrado" });

    // actualizamos el contenido del comentario
    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar comentario", error });
  }
};


export const deleteComment = async (req, res) => {
  try {
    // obtenemos el id del comentario de los parámetros
    const { id } = req.params;

    // buscamos el comentario por ID
    const comment = await CommentModel.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comentario no encontrado" });

    // eliminamos el comentario
    await comment.deleteOne();

    res.json({ msg: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar comentario", error });
  }
};
