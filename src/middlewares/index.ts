import { validateJWT } from "./jwt-validate";
import { fieldValidate } from "./field-validate";
import { isAdminRole, hasRole } from "./role-validate";

export default {
  validateJWT,
  fieldValidate,
  isAdminRole,
  hasRole,
};
