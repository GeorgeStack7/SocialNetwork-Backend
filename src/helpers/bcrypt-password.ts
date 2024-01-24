import bcrypt from "bcrypt";

const encryptPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export { encryptPassword };
