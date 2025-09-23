import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
try {
const token = req.cookies["token"];
if (!token) {
return res.status(401).json({ message: "No autenticado" });
}
// verificar y decodificar token
const decoded = verifyToken(token);

// almacenar datos del usuario
req.user = decoded;
next();
} catch (error) {
res.status(500).json({ message: "Error interno del servidor" });
console.error(error)
}
};
