import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

// Use dotenv to hide password
// Create connections to database and log status of success or failure
mongoose.connect(process.env.MONGODB_URI || 3000).then( () => {
    console.log("Connected to Mongo!");
}).catch((err) => {
    console.log(err);
})

// Create the app for express, and allow server to pass JSON messages
const app = express();
app.use(express.json());

app.use(cookieParser());

// const host = '0.0.0.0';
// const port = process.env.PORT || 3000;
// app.listen(port, host, () => {
//     console.log(`Server started, listening to ${ port }`);
// });
app.listen(process.env.PORT || 3000);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

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