import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message:"TEEESSSST",
    });
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next (errorHandler(401, "It's noy your account!"));
    }
    try {
        if(req.body.password){
            // Encrypt the password from the request
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        // Define variable for update user information
        // Users can only update one of the following fields
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        // Set and save the new information to the user's database
        },{new: true})
        const {password, ...otherInfo} = updateUser._doc;
        res.status(200).json(otherInfo);
    } catch (error) {
        next(error);
    }
}