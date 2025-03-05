import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from "path";
import cors from "cors";

import { connctDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.routes.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statsRoutes from "./routes/stat.route.js" 

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true
    }
));

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath: true,
    limits: { 
        fileSize: 10 * 1024 * 1024 
    }
}))
app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statsRoutes);

app.use((err,req,res,next) =>{
    res.status(500).json({ message:process.env.NODE_ENV === "development" ?  "Internal Server Error" : err.message});
})

app.listen(PORT,() =>{
    console.log("Server is running on port " + PORT);
    connctDB();
})