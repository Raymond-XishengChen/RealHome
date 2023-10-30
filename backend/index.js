import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

// Use dotenv to hide password
// Create connections to database and log status of success or failure
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/realhome').then( () => {
    console.log("Connected to Mongo!");
}).catch((err) => {
    console.log(err);
})

// Create a dynamic directory path
const __dirname = path.resolve();

// Create the app for express, and allow server to pass JSON messages
const app = express();
app.use(express.json());

app.use(cookieParser());

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log(`Server started, listening to ${ port }`);
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Create a static folder by joining the path name
app.use(express.static(path.join(__dirname, "/client/dist")));

// Any request not following the api user, auth and listing, will run inside the client->dist folder
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

// Use middleware to handle error messages
app.use((err, req, res, next) => {
    // Grab the error code or use 500 as Internal Server Error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    // Return the error message that contains success status, error code and the error message
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});