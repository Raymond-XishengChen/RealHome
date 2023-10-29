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

export const getListings = async (req, res, next) =>{
    try {
        // Define a default limit number of search results of 9
        // or use the desired number from the request
        const limit = parseInt(req.query.limit) || 9;

        // Define a default start index from 0
        const startIndex = parseInt(req.query.startIndex) || 0;

        // Define a variable for offer
        var offer = req.query.offer;
        // If "offer" is not selected or by default, search both yes and no for offers
        if (offer === undefined || offer === "false") {
            offer = { $in: [true, false]};
        }

        // Define a variable for parking
        var parking = req.query.parking;
        // If "parking" is not selected or by default, search both yes and no for parkings
        if (parking === undefined || parking === "false") {
            parking = { $in: [true, false]};
        }

        // Define a variable for furnished
        var furnished = req.query.furnished;
        // If "furnished" is not selected or by default, search both yes and no for furnisheds
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [true, false]};
        }

        // Define a variable for type
        var type = req.query.type;
        // If "type" is not selected or by default, search both sale and rent
        if (type === undefined || type === "all") {
            type = { $in: ["sale", "rent"]};
        }

        // Define a constant for deciding if there's a search word or not
        const searchTerm = req.query.searchTerm || "";

        // Define a constant for deciding if there's a certain sorting order by time
        const sort = req.query.sort || "createdAt";

        // Define a constant for deciding if there's a certain order for the listings
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            // $regex search for all results includes in the search term, not limiting to a whole word
            // $options "i" makes the search non-case-sensitive
            name: { $regex: searchTerm, $options: "i" },
            offer,
            parking,
            furnished,
            type,

        }).sort(
            {[sort]: order}
        )
        // Set a limit for the number of search results
        .limit(limit)
        // Set a number for skipping the results, multiples of 9
        .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}