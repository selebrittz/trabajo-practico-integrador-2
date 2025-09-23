import { validationResult } from "express-validator";

export const vaidationsAplicated = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty())
    return res.status(400).json({ error: errores.array() });
  next();
};


// import { validationResult } from "express-validator";

// export const validator = (req, res, next) => {
//   const result = validationResult(req);

//   if (!result.isEmpty()) {
//     return res.json({ errors: result.mapped() });
//   }

//   next();
// };