import User from "../models/user.model.js";
import express from 'express'
import {errorHandler} from '../utils/error.js'
import bcryptjs from "bcryptjs";
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


