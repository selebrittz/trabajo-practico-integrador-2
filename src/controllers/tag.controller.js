import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";


export const createTag = async (req, res) => {
  try {
    const { name } = req.body; // obtenemos el nombre de la etiqueta desde el body

    const newTag = await TagModel.create({ name }); // creamos la etiqueta en la DB

    res.status(201).json(newTag); 
  } catch (error) {
    res.status(500).json({ msg: "Error al crear etiqueta", error }); 
  }
};

// listar todas las etiquetas
export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find(); // buscamos todas las etiquetas
    res.json(tags); 
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener etiquetas", error });
  }
};

// obtener etiqueta por ID con populate de artículos asociados
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params; // obtenemos el ID desde la URL

    const tag = await TagModel.findById(id)
      .populate("articles", "title content"); 
      // solo mostramos title y content de cada artículo

    if (!tag) return res.status(404).json({ msg: "Etiqueta no encontrada" });

    res.json(tag); 
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener etiqueta", error });
  }
};


export const updateTag = async (req, res) => {
  try {
    const { id } = req.params; // ID de la etiqueta a actualizar
    const { name } = req.body; // nuevo nombre

    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { name }, // actualizamos solo el nombre
      { new: true } 
    );

    if (!updatedTag) return res.status(404).json({ msg: "Etiqueta no encontrada" });

    res.json(updatedTag); 
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar etiqueta", error });
  }
};


export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params; // ID de la etiqueta a eliminar

    const tag = await TagModel.findByIdAndDelete(id); 
    if (!tag) return res.status(404).json({ msg: "Etiqueta no encontrada" });

    res.json({ msg: "Etiqueta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar etiqueta", error });
  }
};
