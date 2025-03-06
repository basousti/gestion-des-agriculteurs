import { Request, Response } from "express";
const authService = require("../services/loginS")

async function loginC(req: Request, res: Response) {
    try {
        const { name, password } = req.body;   
        const token = await authService.loginS(name, password); 
        res.json({ token: token });
    } catch (error:any) {
        res.status(401).json({ message: "Invalid credentials" });
        console.log("loginC\t",error.message)
    }
} 

module.exports = { loginC };   
