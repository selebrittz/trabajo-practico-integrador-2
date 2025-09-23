import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword} from "../helpers/bcrypt.helper.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const {username, email, password, role, profile} = req.body;

    try {

        const hashed = await hashPassword(password)

        const newUser = await UserModel.create({
            username:username,
            email: email,
            password: hashed,
            role: role,
            profile: profile
        });
            res.status(201).json ({
            ok:true,
            msg: "usuario y perfil creado correctamente",
            data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            ok:false,
            msg: "error interno del servidor"
        });
    }
};


export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar usuario por username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Comparar contraseña
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar token en cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "error interno del servidor",
    });
  }
};
