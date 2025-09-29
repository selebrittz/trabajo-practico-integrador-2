import { body } from "express-validator";   
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/)
    .withMessage("El nombre de la etiqueta no puede contener espacios")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ name });
      if (tag) {
        throw new Error("El nombre de la etiqueta ya está en uso");
      }
      return true;
    }),
  body("description")
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

export const updateTagValidations = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/)
    .withMessage("El nombre de la etiqueta no puede contener espacios")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ name });
      if (tag) {
        throw new Error("El nombre de la etiqueta ya está en uso");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];