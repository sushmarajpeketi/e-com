import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

const app = express();
app.use(express.json())
mongoose      
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  app.use('/api/user',userRouter)
  app.use('/api/auth',authRouter)

  app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    console.log("I am errorHandler middleware in index.js,Im called!")
    console.log("error  mess",message)
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
  })