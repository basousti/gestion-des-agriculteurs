//npm i jsonwebtoken (generate tokens for every user and store them in cookies)
//jwt is like giving every user who is logged in a scret key(token)so you don't need to enter your password again and again to stay connected 

const jwt = require("jsonwebtoken")
const {secretKey} = require("../configuration/jwtConfig")

interface User {
    _id: string;
    email: string;
    role: string;
}
function generateToken(user:any){
    const payload = {
        id:user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey,{expiresIn:"1h"});
}

export default generateToken;