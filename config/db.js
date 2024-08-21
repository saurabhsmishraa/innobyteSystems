import pkg from "mongoose";
const { connect, connection, disconnect } = pkg;
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const mongoConnect = async () => {
    await connect(MONGO_URI).then(() => {
        console.log("MongoDB connected");
    }).catch((error) => {
        console.log(error, 'MongoDb not connect');
    })
    connection.on('connected', () => {
        console.log('connected to MongoDB');
    })
    connection.on('error', (error) => {
        console.log(error, 'error in MongoDB');
    })
    connection.on('disconnected', () => {
        console.log('disconnected from MongoDB');
    })
}
const mongoDisconnect = async () => {
    try {
        await disconnect();
    } catch (error) {
        console.log('mongodb connection disconnect')
    }
}
export { mongoConnect, mongoDisconnect }