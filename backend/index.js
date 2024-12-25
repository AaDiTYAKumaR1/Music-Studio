import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import path from "path"
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary'
import uploadSong from './middlewares/uploadSong.js';
import uploadThumbnail from './middlewares/uploadFile.js';
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});



const app=express();

app.set("view engine", "ejs");
app.set("views",path.resolve("./backend/views"))
app.use(express.static("public"));
app.use(express.json(
    {
        limit:"50mb",
        extended:true,
    }
));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://127.0.0.1:5173"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))


import authRouter from "./routes/userRouter.js";
import songRouter from './routes/song.Router.js';
import artistRouter from './routes/artist.Router.js';
import userSongRouter from './routes/userSong.Router.js';
import aiRouter from './routes/ai.Router.js';
import albumRouter from './routes/album.Router.js';
import uploadData from './middlewares/uploadboth.js';
import User from './models/user.model.js';

app.use("/api/v1",authRouter);
app.use("/api/v1",songRouter);
app.use("/api/v1",artistRouter);
app.use("/api/v1",userSongRouter);
app.use("/api/v1",aiRouter);
app.use("/api/v1" ,albumRouter);

app.get("/",async(req,res)=>{
    const data= await User.find()
        console.log(data)
       return res.json(data)
    })


const PORT=process.env.PORT || 4000
async function startServer(){
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database conneted successfull")
    app.listen(PORT,()=>{
        console.log(`Server Running at Port ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)    
}
)
}
startServer();