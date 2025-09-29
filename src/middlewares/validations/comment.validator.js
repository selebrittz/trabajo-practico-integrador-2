import { body } from "express-validator";   
import { CommentModel } from "../../models/comment.model.js";



export const createCommentValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El campo de content es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("article")
    .isMongoId()
    .withMessage("El artículo debe ser un ID válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El article no existe");
      }
      return true;
    }),
];

export const updateCommentValidations = [
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de content es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("article")
    .optional()
    .isMongoId()
    .withMessage("El artículo debe ser un ID válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El article no existe");
      }
      return true;
    }),
];