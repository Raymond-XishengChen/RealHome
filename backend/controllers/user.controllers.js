import User from "../models/user.model.js";
import Listings from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message:"TEEESSSST",
    });
}

export const updateUser = async (req, res, next) => {
    // Check user id if it matches
    if(req.user.id !== req.params.id){
        return next (errorHandler(401, "It's not your account!"));
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

export const deleteUser = async (req, res, next) => {
    // Check user id if it matches
    if(req.user.id !== req.params.id){
        return next (errorHandler(401, "It's not your account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted!")
    } catch (error) {
        next(error);
    }
}

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id) {
        try {
            const listings = await Listings.find({ userReference: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "It's not your account!"));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return next (errorHandler(404, "User not found!"))
        }
        const { password: pass, ...otherInfo } = user._doc;
        res.status(200).json(otherInfo);
    } catch (error) {
        next (error);
    }
    
}