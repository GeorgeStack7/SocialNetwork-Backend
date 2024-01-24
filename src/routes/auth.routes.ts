import { login } from "../controllers/auth.controllers";
import { Router } from "express";
import { check } from "express-validator";
import { fieldValidate } from "../middlewares/field-validate";
import { validateJWT } from "../middlewares/jwt-validate";

const router: Router = Router();

router.post("/login", [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    fieldValidate
], login);

export default router