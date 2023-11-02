import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
dotenv.config();

const app = express();
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