import User from "../models/user.model.js";
import express from "express";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
    res.status(201).json(
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



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); //returns whole obj of user
    // console.log("av",validUser._doc)
    if (!validUser) return next(errorHandler(404, "No user found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    // console.log("token is",token)
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(createResponse(true, "jwt token signed", rest));
  } catch (err) {
    next(err);
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("user is ", user)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};