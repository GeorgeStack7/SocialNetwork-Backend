import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";

interface IPayload {
    uid: string;
    iat: number;
    exp: number;
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'Access Denied'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as IPayload;

        const user = await User.findById(uid)     
        
        if ( !user ) {
            return res.status(401).json({
                msg: 'Usuario no existe en BD'
            })
        }

        if ( !user?.status ) {
            return res.status(401).json({
                msg: 'Access Denied'
            })
        }

        req.user = user

        next();
    } catch (err) {
        console.log(err);        
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

export {
    validateJWT
}