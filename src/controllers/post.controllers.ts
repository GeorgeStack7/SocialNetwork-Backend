import { Request, Response } from "express";

import Post, { IPost } from "../models/post";
import User from "../models/user";
import mongoose from "mongoose";


const createPost = async(req: Request, res: Response) => {

    const { title, content } = req.body;
    const { userId } = req.params
    // const toId = mongoose.Types.ObjectId
    // id = new toId(id);
    
    const post: IPost = new Post({ title, content, userId });

    try {
        const profile = await User.findById(userId);

        if (!profile) {
            return res.status(400).send("User not found");
        }

        const newPost = await post.save();

        // await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });
        
        res.send({ success: "Post added", newPost });   

    } catch (error) {
        console.error(error);
    }
};

const getPosts = async(req: Request, res: Response) => {

    const posts = await Post.find().populate({path: "userId"});

    res.json({
        msg: "get Api - controlador",
        posts
    });
};

const updatePost = async(req: Request, res: Response) => {
    
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    const post = await Post.findByIdAndUpdate(id, rest);

    res.json({
        msg: "put Api - controlador",
        post
    });
};

const deletePost = async(req: Request, res: Response) => {
    
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: "delete Api - controlador",
        post
    });
};

const likePost = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { _id, likes } = req.body;

    // const post = await Post.findByIdAndUpdate(id, likes);
    const likes2 = await Post.find().populate("users")

    res.json({
        msg: "put Api - controlador",
        likes2
    });
};


export { createPost, likePost, getPosts };