import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
}

const roleSchema = new Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

export default model<IRole>("Role", roleSchema);
