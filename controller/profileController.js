import jwt from 'jsonwebtoken';
import userModel from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config()
export const profileController = async (req) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        req.user = decode;
        const user = await userModel.find({ email: decode.email }).select('-password');
        return user;
    } catch (error) {
        console.log(error)
    }
}