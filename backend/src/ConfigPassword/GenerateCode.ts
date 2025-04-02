const UserF = require("../models/users");
const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
import { Request, Response } from "express";


async function generateCode ( email:String) {
    let verificationCode = "";
    let Length = 6;
    try {
        const existingUser = await UserF.findOne({ email  })
        if(!existingUser){
            throw new Error ("User not found");
        }
        
        for (let i = 0; i < Length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                verificationCode += characters[randomIndex];
            }    

        console.log(verificationCode);
        
        // Save the generated code in the user's document
        existingUser.verificationCode = verificationCode;
        existingUser.verificationExpires = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes
        await existingUser.save();

        return verificationCode;

    } catch (error:any) {
        throw new Error(`we didn't find credential: ${error.message}`);
    }
} 

// fezet el mail bch yebda kolchayy en cordination

async function VerifyCode(req: Request, res: Response) {
    try {
        const { email, enteredCode } = req.body;

        if (!email || !enteredCode) {
            return res.status(400).json({ message: "Missing email or code" });
        }

        // Find the user by email
        const existingUser = await UserF.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log(existingUser.verificationCode);
        // Check if the code matches and hasn't expired
        if (
            existingUser.verificationCode !== enteredCode ||
            existingUser.verificationExpires < Date.now()
        ) {
            return res.status(400).json({ message: "Incorrect or expired code" });
        }

        // Clear the verification code after successful verification
        existingUser.verificationCode = null;
        existingUser.verificationExpires = null;
        await existingUser.save();

        return res.status(200).json({ message: "Code is correct" });

    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
} 

module.exports = {generateCode,VerifyCode}

