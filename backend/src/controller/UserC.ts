import { Request,Response } from "express"
const userService = require("../services/UserS")

async function getUsers(req:Request,res:Response) {
    try {
        const users = userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message : "UserC ", error})
    }
}

module.exports ={getUsers};