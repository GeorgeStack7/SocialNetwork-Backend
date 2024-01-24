import { check } from "express-validator";
import { createPost, getPosts } from "../controllers/post.controllers";
import { Router } from "express";

import validations from "../middlewares";

const router: Router = Router();

router.post("/createPost/:userId", [
    check('title', 'El titulo debe contener al menos 1 caracter').isLength({min: 1}),
    validations.fieldValidate
],createPost);
router.get("/getPosts",[
    validations.validateJWT, 
    validations.fieldValidate],getPosts);

export default router