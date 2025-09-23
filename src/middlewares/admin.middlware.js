export const AdminMiddleware = (req, res, next) => {
  const userLogged = req.user;
  
//verifico el rol que tiene el user
  if (!userLogged.role !== "admin") {
    return res.status(401).json({
      msg: "Usted no tiene los permisos",
    });
  }

  next();
};
