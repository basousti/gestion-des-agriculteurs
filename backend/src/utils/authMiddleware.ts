//this file check the headers it should contain the secretkey and if there is a token and does it start with the word Bearer 
//if everything is good the user can see the page , This helps protect our website 

import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken")
const secretKey = require("../configuration/jwtConfig")

/*The problem here is that TypeScript doesn’t know that req.user can exist on 
the Request object, which causes it to throw the error "Property 'user' does not exist on type 'Request...'".*/
//This tells TypeScript that `Request` can have a `user` property
declare global {
    namespace Express {
      interface Request {
        user?: any;  // You can replace `any` with a more specific type, like { id: string }
      }
    }
  }


function authenticationToken(req: Request,res:Response,next:NextFunction){
    const authHeader = req.header("Authorization");
    console.log("ahayy",authHeader)
    if(!authHeader){
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
      }
      const [bearer, token] = authHeader.split(" ");
      if(bearer !== "Bearer" || !token){
        return res.status(401).json({message :"Unauthorized : Invalid token!"});
      }

      jwt.verify(token, secretKey, (err:any, user:any)=>{
        if(err){
            return res.status(403).json({message :"Forbidden : Invalid token!"});
        }
        req.user = user;
        next();
      })
}

module.exports ={authenticationToken}