import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js"

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) return res.status(401).json({ message: "No autenticado" });

    // verificar y decodificar token
    const decoded = verifyToken(token);

    // Traer el usuario completo desde la DB
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    // asignar usuario completo a req.user
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
