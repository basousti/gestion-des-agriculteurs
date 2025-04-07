const User = require("../models/users");
const bcrypt = require("bcrypt");

interface UserData {
    name: string;
    email: string;
    matriculate: String;
    password: string;
}
async function createUser(userData:UserData) {
    
    const {name,email,matriculate,password}=userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedMat = await bcrypt.hash(matriculate, 10);
    const createUser = new User({
        name, 
        email,
        matriculate: hashedMat, 
        password: hashedPassword ,
        role :"employer" });
    
    const existingUser = await User.findOne({ email })
    if(!existingUser)
        {const savedUser = await createUser.save();
         return savedUser;}
    else{
        throw new Error ("User already exists");
    }
}

module.exports = {createUser};