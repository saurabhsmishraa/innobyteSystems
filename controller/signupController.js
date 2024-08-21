import nodemailer from "nodemailer";
import dotenv from "dotenv";
import userModel from '../model/userModel.js'
import { hashPassword } from "../helper/passwordSecure.js";
import { validateEmail, validatePassword } from "../helper/emailValidation.js";
import { getUserByMail } from "../helper/userUtil.js";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reuben.willms@ethereal.email',
        pass: 's7ppQupdmMaSyPMehD'
    }
});

export const signupControler = async (req) => {
    try {
        const { username, email, password } = req.body;
        if (!username) {
            return { error: "username is required" }
        }
        if (!email) {
            return { error: "email is required" }
        } else if (!validateEmail(email)) {
            return { error: "Invalid email" }
        } else if (await getUserByMail(email) !== null) {
            return { error: "Email already exists" }
        }
        if (!password) {
            return { error: "password is required" }
        } else if (!validatePassword(password)) {
            return { error: "Password must be at least 6 characters long and contain at least one" }
        }
        const hashedPaasword = await hashPassword(password)
        const saveUser = await userModel({
            username,
            email,
            password: hashedPaasword
        }).save();
        const info = await transporter.sendMail({
            from: '"saurabh mishra" <saurabhpbh1999@gmail.com>', // sender address
            to: "saurabh@gmail.com", // list of receivers
            subject: "confirm your email", // Subject line
            text: "Thank you for registering. please confirm your mail", // plain text body

        });

        return {
            info,
            message: "user created successfully",
            user: saveUser
        }
    } catch (error) {
        console.log(error)
    }
}