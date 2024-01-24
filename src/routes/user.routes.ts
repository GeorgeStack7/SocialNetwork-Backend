import { Router } from "express";
import { check } from "express-validator";

import { existEmail, existUserById, isRoleValidate } from "../helpers/db-validators";

import validations from "../middlewares";

import {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} from "../controllers/user.controllers";

const allowedRoles: string = 'ADMIN_ROLE, SALES_ROLE'

const router: Router = Router();

router.get("/", [
  validations.validateJWT,
], getUsers);
router.post("/",[
  check('fullName', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( existEmail ),
  check('role').custom( isRoleValidate ),
  validations.fieldValidate
],postUsers);
router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isRoleValidate ),
  validations.fieldValidate
], putUsers);
router.patch("/", patchUsers);
router.delete("/:id", [
  validations.validateJWT,
  // isAdminRole,
  validations.hasRole(allowedRoles),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isRoleValidate ),
  validations.fieldValidate
],deleteUsers);

export default router;
