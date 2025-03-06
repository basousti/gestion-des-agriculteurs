//creating login service 
const bcrypt = require("bcrypt")
const Users = require("../models/users")
import generateToken from "../utils/JWTutils";


async function loginS(name:string,password:string) {
    try {
        const existingUser = await Users.findOne({ name  })
        if(!existingUser){
            throw new Error ("User not found")
        }
        const isPWvalid = bcrypt.compare(password,existingUser.password)
        if(!isPWvalid){
            throw new Error("wrong password")
        }
        const token = generateToken(existingUser);
        console.log("Generated Token:", token);  // ✅ Add this
        return token;

    } catch (error:any) {
        throw new Error(`we didn't find credential: ${error.message}`);
    }

} 

module.exports={loginS}