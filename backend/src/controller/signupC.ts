import { Request, Response } from 'express';
const userService = require("../services/signupS");

async function createUser(req: Request, res: Response) {
    try {
        const userData = req.body;
        console.log("im creating user",userData)
        const user = await userService.createUser(userData);
        res.status(201).json({ user: user, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating user" });
    }
}
module.exports = { createUser };
