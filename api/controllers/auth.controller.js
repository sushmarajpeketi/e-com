import User from "../models/user.model.js";
import express from 'express'
import {errorHandler} from '../utils/error.js'
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'


function createResponse(ok, message, data) {
  return { ok, message, data };
}
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // const hashedPassword = await bcrypt.hash(password,10)
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // console.log("hashedPassword password is "+ hashedPassword)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res
      .status(201)
      .json(
        createResponse(true, "user is created succesffully", {
          username,
          email,
        })
      );
  } catch (err) {
    next(err);
    // res.status(500).json(createResponse(false,"error during creating user",err.message ))
  }
};

export const signin = async(req,res,next) =>{

    const {email,password} = req.body
    try{
      const validUser = await User.findOne({email}) //returns whole obj of user
      console.log("av",validUser._doc)
      if(!validUser) return errorHandler(404,"No user found!")
      const validPassword = bcryptjs.compareSync(password,validUser.password)
      if(!validPassword) return errorHandler(404,"Wrong credentials")
      const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      const {password:pass,...rest} = validUser._doc
    console.log("token is",token)
    res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(createResponse(true,"jwt token signed",rest))
    }catch(err){
        next(err)
    }

}

