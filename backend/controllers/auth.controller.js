import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
// import { jwt } from "jsonwebtoken";
import jwt from 'jsonwebtoken';       
// const { jwt } = pkg;


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

export const signin = async (req, res, next) => {
    // Construct the request body, users can login with email and password
    const { email, password } = req.body;
    // For log in, need to check if email address is already registered in the database, then the password
    try {
        // Look for registered user, if not found, return an error message
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "Login failed!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(404, "Login failed!!"));
        }

        // Use JSON Web Token to create a token for checking if they are authenticated
        // Use the unique ID created by Mongodb as a unique key
        // Adding a secret key to sign the JWT.
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        // Create a cookie with an access token, expires in 2 hours
        res
            .cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 120 * 60)})
            .status(200)
            .json(validUser);
    } catch (error) {
        next(error);
    }
}