import { Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index";
const User = db.user;
const saltRounds=10;
const SECRET_KEY="blogs";
const userSignup = async (req:Request, res:Response) => {
  try {
    let data = req.body;
                const {userId,title,firstName,lastName,mobileNumber,email,password}= data;
                data.password = await bcrypt.hash(password,saltRounds);
                let savedData = await User.create(data);
                res.status(201).send({status:true,Data:savedData})
  } catch (err:any) { 
    return res.status(500).json({ status: false, message: err.message });
  }
};
  
  const userLogin = async(req:Request,res:Response)=>{
    try {
        let data = req.body;
        let userEmail= data.email    
        let userPassword= data.password

        const checkCred = await User.findOne({ where: { email:userEmail } });
       
        // If the user is not found or the password is incorrect, send an error response
        if (!checkCred || !(await bcrypt.compare(userPassword, checkCred.password))) {
        return res.status(401).json({ message: 'Email or Password is incorrect' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: checkCred.userId }, SECRET_KEY, { expiresIn: '1h' });
         res.status(201).send({message:'You are Successfully LoggedIn',data: token})

    } catch (err:any) {
      return res.status(500).json({ status: false, message: err.message});
    }
  };    

export  {userSignup,userLogin};
