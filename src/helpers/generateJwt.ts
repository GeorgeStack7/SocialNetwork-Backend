import jwt from "jsonwebtoken";

const generateJWT = ( uid: string ) => {

    return new Promise( (resolve, reject) => {

        const JWT =  process.env.SECRETORPRIVATEKEY!
        
        const payload = { uid }

        jwt.sign( payload, JWT, {
            expiresIn: '1h'
        }, ( error, token ) => {
            if (error) {
                console.log(error);
                reject( 'No se pudo generar el JWT' )
            } else {
                resolve( token )
            }
        })
    })
}

export {
    generateJWT
}