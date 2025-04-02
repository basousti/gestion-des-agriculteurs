import { Request,Response } from "express";
const bcryptPw =require("bcrypt") ;
const UserModel = require("../models/users"); 

async function UpdatePw(email: string, oldPassword: string, newPassword: string) {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        
        const isMatch = await bcryptPw.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        const salt = await bcryptPw.genSalt(10);
        const hashedPassword = await bcryptPw.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return { message: "Password updated successfully" };

    } catch (error: any) {
        throw new Error(`Problem in updating password: ${error.message}`);
    }
}

async function UpdatePassword(req: Request, res: Response)

    {
        try {
            const user = req.body;
            await UpdatePw(user.email, user.oldPassword, user.newPassword);
            res.status(201).json({ user: user, message: "Password updated successfully" });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error updating password" });
        }
    }

module.exports = { UpdatePassword, UpdatePw };

