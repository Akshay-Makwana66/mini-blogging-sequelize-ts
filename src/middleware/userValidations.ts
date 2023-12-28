import { Request,Response,NextFunction } from "express";
import db from "../models/index";
const User = db.user;
const userValidations = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let data = req.body;
        
            // Checks whether Title is empty or is enter as a string or contains the enumerator values or not.
            if (!data.title)return res.status(400).json({ status: false, msg: " Please enter Title" });
        
            if (typeof data.title !== "string")return res.status(400).json({ status: false, msg: "Please enter Title as a String" });
            
            let Titles = ["Mr", "Mrs", "Miss"];
                
            data.title = data.title.trim();
        
            if (!Titles.includes(data.title))return res.status(400).json({status: false,msg: "Please enter Title as Mr, Mrs or Miss only",});
            
            // Checks whether first name is empty or is enter as a string or contains only letters
        
            if (!data.firstName)return res.status(400).json({ status: false, msg: "Please enter FirstName" });

            if (typeof data.firstName !== "string") return res.status(400).json({ status: false, msg: " Please enter FirstName as a String" });

            let validFirstName = /^\w[a-zA-Z.]*$/; 
            
            if (!validFirstName.test(data.firstName))return res.status(400).json({ status: false, msg: "The FirstName may contain only letters" });

            data.firstName = data.firstName.trim();

            // Checks whether last name is empty or is enter as a string or contains only letters

            if (!data.lastName)return res.status(400).json({ status: false, msg: "Please enter LastName" });

            if (typeof data.lastName !== "string")return res.status(400).json({ status: false, msg: "Please enter LastName as a String" });

            let validLastName = /^\w[a-zA-Z.]*$/;

            data.lastName = data.lastName.trim();

            if (!validLastName.test(data.lastName))return res.status(400).json({ status: false, msg: "The LastName may contain only letters" });

            // mobile validations-------------
            if (!data.mobileNumber) return res.status(400).send({ status: false, msg: "Please Enter Mobile Number" });
            if (typeof data.mobileNumber !== "string") return res.status(400).send({ status: false, msg: " Please enter only Mobile number of 10 digits & put in string" });
            let validMobile = /^[6-9]\d{9}$/
            if (!validMobile.test(data.mobileNumber)) return res.status(400).send({ status: false, msg: "The user Mobile number should be indian may contain only 10 number" });
            // let Mobile = data.Mobile;
            const mobileCheck = await User.findOne({where:{mobileNumber:data.mobileNumber}});
            if (mobileCheck) {
                return res.status(400).json({ message: `${data.mobileNumber} already exists` });
              }

           
        
            // Checks whether Email is empty or is enter as a string or is a valid Email or already exists

            if (!data.email)return res.status(400).json({ status: false, msg: "Please enter Email" });

            if (typeof data.email !== "string")return res.status(400).json({ status: false, msg: "Please enter Email as a String" });

            let Email = data.email;
            if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(Email))return res.status(400).json({ status: false, msg: "Entered Email is invalid" });

            const emailCheck = await User.findOne({where:{email:Email}})
            if (emailCheck!=null) {
            return res.status(400).json({ message: `${data.email} already exists` });
            }


            // Checks whether Password is empty or is enter as a string or a valid pasword.
            if (!data.password)return res.status(400).json({ status: false, msg: "Please enter Password" });

            if (typeof data.password !== "string")return res.status(400).json({ status: false, msg: " Please enter Password as a String" });

            let validPassword =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

            if (!validPassword.test(data.password))return res.status(400).json({status: false,msg: "Please enter min 8 letter Password, with at least a symbol, upper and lower case letters and a number"});


            next();
            

    }catch(err){
        console.log(err);
        
        return res.status(500).json({ status: false, message: "validation failed" });
    }
}

export default userValidations;