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
    // buscar usuario por username
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

//Actualizar perfil embebido del usuario autenticado. 
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profileData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      biography: req.body.biography,
      avatarUrl: req.body.avatarUrl,
      birthday: req.body.birthday,
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { profile: profileData } }, //solo actualiza el objeto profile
      { new: true,//para que devuelva la actualizacion 
       runValidators: true } //para que tome las mismas validaciones
    ).select("-password -__v"); //para que devuelva todo menos la contraseña

    res.json(updatedUser.profile); // devolvemos solo el perfil
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al actualizar perfil", error });
  }

};
// try {
//   const user = await UserModel.findById(userId);
//   if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

//   // Merge con los campos enviados
//   user.profile = {
//     ...user.profile.toObject(),
//     ...req.body.profile
//   };

//   await user.validate(); // valida todo el subdocumento antes de guardar
//   await user.save();     // guarda los cambios

//   res.json(user.profile);
// } catch (error) {
//   console.log(error);
//   res.status(500).json({ message: "Error al actualizar perfil", error });
// }

//recomendacion de codigo de una ia
 
//obtener perfil del usuario autenticado.
export const getProfile = async (req, res) =>{
  try {
        const userId = req.user.id; // viene del token por el authMiddleware

    const user = await UserModel.findById(userId)
      .select("username email role profile"); // devolvemos solo lo necesario

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user.profile); //devolvemos solo el perfil
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};
    

export const logout = async (req,res) => {
  res.clearCookie("token")
  return res.json({msg: "logout exitoso" });
};