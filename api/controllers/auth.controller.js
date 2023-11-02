import User from '../models/user.model.js'
// import bcrypt from 'bcrypt'
import bcryptjs from 'bcryptjs'
 function createResponse(ok,message,data){
    return {ok,message,data}
}
export const signup = async (req,res)=>{
    const {username,email,password} = req.body
    // const hashedPassword = await bcrypt.hash(password,10)
    const hashedPassword = bcryptjs.hashSync(password,10)
    // console.log("hashedPassword password is "+ hashedPassword)
    const newUser = new User({username,email,password:hashedPassword})
    try{
        await newUser.save()
        res.status(201).json(createResponse(true,"user is created succesffully",{username,email}))
    }
    catch(err){
        res.status(500).json(createResponse(false,"error during creating user",err.message ))
    }
    

}