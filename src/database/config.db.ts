import mongoose from "mongoose";

const dbConnection = async() => {

    try {
        const MONGODB_JAGUAR2: string = process.env.MONGODB_JAGUAR2 !== undefined ? process.env.MONGODB_JAGUAR2 : '';
        await mongoose.connect( MONGODB_JAGUAR2, { dbName: 'socialNetwork' } );
        console.log('Database Connected Successfully!!!');
    } catch (error) {
        console.log(error);        
        throw new Error("Error al tratar de conectarse con la BD");        
    }
}

export {
    dbConnection
}