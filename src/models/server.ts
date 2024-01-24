import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";

import cors from "cors";
import morgan from "morgan";

import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes"
import postRoutes from "../routes/post.routes";

import { dbConnection } from "../database/config.db";

export class Server {
  app: Application;
  port: string | undefined;
  usersPath: string;
  authPath: string;
  postPath: string;
  constructor() {

    this.app = express();
    this.port = process.env.PORT || "4000";

    this.usersPath = "/api/user";
    this.authPath = "/api/auth";
    this.postPath = "/api/post";

    // Settings
    this.app.set("port", this.port);

    // Conexion a base de datos
    this.dbConnect();

    // Middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {

    //CORS
    // let corsOptions = { 
    //   origin : ['http://localhost:4200', 'http://172.100.168.160:4200', 'http://socialnetwork.brickcode.com.co:4200'], 
    // } 

    var corsOptions = {
      origin: 'http://socialnetwork.brickcode.com.co:4200/auth/login',
      optionsSuccessStatus: 200, // For legacy browser support
      methods: ["GET, PUT, POST, DELETE, PATCH, OPTIONS"]
  }


    this.app.use(cors());

    this.app.use(morgan("dev"));
    
    //Lectura y Parseo del body
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: false }));
    
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usersPath, userRoutes);
    this.app.use(this.postPath, postRoutes);
  }

  listen() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on port ${this.app.get('port')}`);
    });
  }
}
