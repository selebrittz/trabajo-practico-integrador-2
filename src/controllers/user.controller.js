import { UserModel } from "../models/user.model.js";   
import { ArticleModel } from "../models/articles.model.js";


export const getUsers = async (req, res) => {
 try {
    const users = await UserModel.find().populate("articles")
    res.json(users);
 } catch (error) {
  console.error(error)
    res.status(500).json ({msg: "no se pudo obtener los usuarios"})
 };
}

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("articles").populate("comments")
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
}; 

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
