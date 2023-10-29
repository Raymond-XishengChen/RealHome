import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next (error);
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    // Check if listing exists
    if(!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }
    // Check if user is the owner of the listing by comparing the request id to the user reference
    if (req.user.id !== listing.userReference) {
        return next (errorHandler(401, "The listing it's not under your account!"));
    }

    // If the listing exist and the user is the owner of the listing
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing is deleted successfully!")
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    // Check if listing exists
    if(!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }
    // Check if user is the owner of the listing by comparing the request id to the user reference
    if (req.user.id !== listing.userReference) {
        return next (errorHandler(401, "The listing it's not under your account!"));
    }

    // If the listing exist and the user is the owner of the listing
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) =>{
    try {
        const listing = await Listing.findById(req.params.id);
        // Check if listing exists
        if(!listing){
            return next(errorHandler(404, "Listing not found!"))
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}