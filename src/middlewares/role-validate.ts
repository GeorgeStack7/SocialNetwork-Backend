import { NextFunction, Request, Response } from "express"


const isAdminRole = ( req: Request, res: Response, next: NextFunction ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'check role without checking token first'
        });
    }

    const { role, name } = req.user

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: ` ${ name } no es administrador - no puedes realizar esta operación `
        })
    }

    next();
}

const hasRole = ( roles: string | any[] ) => {
    
    return (req: Request, res: Response, next: NextFunction) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'check role without checking token first'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere algunos de estos roles ${ roles } el rol del usuario actual es: ${ req.user.role }`
            })
        }
        next()
    }
}

export {
    isAdminRole,
    hasRole
}