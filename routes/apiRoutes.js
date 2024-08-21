import express from "express";
import { signupControler } from "../controller/signupController.js";
import { loginController } from "../controller/loginController.js"
import { profileController } from "../controller/profileController.js";
import { auth } from "../middelware/auth.js";
const router = express.Router();
router.post("/signup", async (req, res) => {
    const response = await signupControler(req);
    res.status(200).send(response);
});
router.post('/login', async (req, res) => {
    const response = await loginController(req);
    res.status(200).send(response);
})
router.get('/profile', auth, async (req, res) => {
    const response = await profileController(req);
    res.status(200).send(response)
})
export default router;