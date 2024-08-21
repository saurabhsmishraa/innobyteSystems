import userModel from "../model/userModel.js";
import { comparePassword } from "../helper/passwordSecure.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const loginController = async (req) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return { status: 400, message: 'please enter both email and password' }

        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return { status: 404, message: 'Email not registered' }
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return { status: 401, message: 'Invalid password' }
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' })
        return { status: 200, message: 'Login successfull', user: user, token: token }
    } catch (error) {
        console.log(error)
    }
}