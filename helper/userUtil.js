import userModel from "../model/userModel.js";
export const getUserByMail = async (email) => {
    try {
        const user = await userModel.findOne({ email })
        return user
    } catch (error) {
        console.log(error)
        return null;
    }
}