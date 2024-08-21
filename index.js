import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";
import bodyParser from "body-parser";
import { mongoConnect } from "./config/db.js";
const app = express();
dotenv.config();
mongoConnect();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', apiRoutes)
const PORT = process.env.PORT || 6600;
app.get('/', (req, res) => {
    res.send("hello world")
})
app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`)
})