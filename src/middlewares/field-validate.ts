import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const fieldValidate = ( req: Request, res: Response, next: NextFunction ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Por favor validar los errores a continuación",
      errors,
    });
  }
  next();
};

export {
    fieldValidate
}