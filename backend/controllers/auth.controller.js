import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req,res,next) => {
    // Construct the request body, having fields of username, email, password to save to database
    const { username, email, password } = req.body;
    // Hide the password using bcryptjs by calling hashSync
    const encryptPassword = bcryptjs.hashSync(password, 10);
    // Create a new user with the User model, with the encrypted password
    const newUser = new User ({ username, email, password: encryptPassword });
    // Try to save the user information to database
    // If error occurs, log the error message
    try {
        await newUser.save();
        // Send a message after saving user info to database
        res.status(201).json("You have successfully created an account!");
    } catch (error) {
        next (error);
    }

}