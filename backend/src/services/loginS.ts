//creating login service 
const bcrypte = require("bcrypt")
const Users = require("../models/users")
const {verifyToken} = require("../utils/authMiddleware")
import { generateToken } from "../utils/JWTutils";

async function loginS(name:string,password:string) {
    try {
        const existingUser = await Users.findOne({ name  })
        if(!existingUser){
            throw new Error ("User not found")
        }

        const isPWvalid = bcrypte.compare(password,existingUser.password)
        if(!isPWvalid){
            throw new Error("wrong password")
        }
        const token = generateToken(existingUser);
        console.log("Generated Token:", token);  
        return token;

    } catch (error:any) {
        throw new Error(`we didn't find credential: ${error.message}`);
    }

} 

async function refreshToken(oldtoken:string) {
    try {
        const decodedToken =verifyToken(oldtoken);
        Users.findById(decodedToken._id);
        if(!Users){
            throw new Error("User not found of this token")
        };
        const newToken = generateToken(Users);
        return newToken;
       }
    catch (error:any) {
        throw new Error(`we didn't find credential: ${error.message}`);
        }
}
module.exports={refreshToken,loginS}
