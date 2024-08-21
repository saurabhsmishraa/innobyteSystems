import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config()
export const auth = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        req.user = decode;
        console.log(decode)
        next();
    } catch (error) {
        console.log(error)
        res.status(501).json({ error: 'auth token is not verified' })
    }
}