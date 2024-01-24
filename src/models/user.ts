import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
    fullname: string;
    age: number;
    email: string;
    password: string;
    posts: Array<string>;
    img: string;
    role: string;
    status: boolean;
}

const userSchema = new Schema({

    fullName: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    age: {    
        type: Number,
        required: [true, 'La edad es obligatoria'],
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    posts: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: 'Post'
        }
    ],
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    }
    
})

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id
    return user
}

export default model<IUser>('User', userSchema)