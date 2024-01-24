import mongoose, { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  likes: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 1,
  },
  content: {    
    type: String,
    required: true,
    min: 1,
  },
  likes: {
    type: Boolean,
    default: false,
  },
  userId: [
    {
      type: mongoose.Types.ObjectId, 
      ref: 'User',
      required: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
});

export default model<IPost>("Post", postSchema);
