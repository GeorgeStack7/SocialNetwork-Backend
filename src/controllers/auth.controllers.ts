import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { generateJWT } from "../helpers/generateJwt";


const login = async(req: Request, res: Response) => {

    res.header('Access-Control-Allow-Origin', '*');

    const { email, password } = req.body;
    const JWT =  process.env.SECRETORPRIVATEKEY!

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: 'El email no es correcto'
            })
        }
        
        if (!user?.status) {
            return res.status(400).json({
                msg: 'El email/password no son correctos'
            })
        }

        const validPassword = bcrypt.compareSync( password, String(user?.password) )
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El email/password no son correctos'
            })
        }
        const token = await generateJWT( user?.id )

        res.json({
            msg: "Login Ok",
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
};

export { login };
