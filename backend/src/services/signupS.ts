const User = require("../models/users");
const bcrypt = require("bcrypt");

interface UserData {
    name: string;
    email: string;
    password: string;
}

async function createUser(userData:UserData) {

    const {name,email,password}=userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
        name, 
        email, 
        password: hashedPassword ,
        role :"employer" });

    const savedUser = await createUser.save();
    return savedUser;
}

module.exports = {createUser};