import Role from "../models/role";
import User from "../models/user";

const isRoleValidate = async (role: string) => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const existEmail = async ( email: string) => {
  const validateEmail = await User.findOne({ email });
  if (validateEmail) {
    throw new Error(`El correo ${email} ya esta registrado`);
  }
};

const existUserById = async ( id: string) => {
  
  const validateUser = await User.findById(id);  
  if (!validateUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

export { isRoleValidate, existEmail, existUserById };
