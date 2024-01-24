import { Request, Response } from "express";

import User, { IUser } from "../models/user";
import { encryptPassword } from "../helpers/bcrypt-password";

const getUsers = async(req: Request , res: Response) => {

  const { limit = 5, since = 0 } = req.query; 
  const queryStatusUser: Object = { status: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments(queryStatusUser),
    User.find(queryStatusUser)
      .populate({path: "posts"})
      .skip(Number(since))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    users,    
  });
};

const postUsers = async (req: Request, res: Response) => {

  const { fullName, age, email, password, posts, role } = req.body;
  const user: IUser = new User({ fullName, age, email, password, posts, role });

  user.password = encryptPassword(password);

  await user.save();
  
  res.json({
    msg: "post Api - controlador",
    user
  });
};

const putUsers = async(req: Request , res: Response) => {

  try {
    
    const { id } = req.params
    const user: IUser = req.body
    // const { password, ...rest } = req.body
    // const user: IUser = new User({ password, ...rest });
  
    if ( user.password ) {
      user.password = encryptPassword(user.password);
    }
  
    const updatedUser = await User.findByIdAndUpdate( id, user );
    
    res.json(updatedUser);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error updating user'
    });
  }

};

const patchUsers = (req: Request , res: Response) => {
  res.json({
    msg: "patch Api - controlador",
  });
};

const deleteUsers = async(req: Request , res: Response) => {

  const queryStatusUser: Object = { status: false };

  const { id } = req.params

  const user = await User.findByIdAndUpdate( id, queryStatusUser )

  const AuthenticatedUser = req.user

  res.json({
    msg: 'Usuario borrado satisfactoriamente',
    user,
    AuthenticatedUser
  });
};

export { 
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}