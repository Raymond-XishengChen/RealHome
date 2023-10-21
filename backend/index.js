import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Use dotenv to hide password
// Create connections to database and log status of success or failure
mongoose.connect(process.env.MONGOKEY).then( () => {
    console.log("Connected to Mongo!");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!");
})