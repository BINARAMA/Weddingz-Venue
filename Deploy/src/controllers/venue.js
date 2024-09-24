import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { Venue } from "../models/venue.js";
import jwt from 'jsonwebtoken';

export const Register = asyncHandler(async (req, res, next) => {
    const { businessName, yourName, email, password, phone, city, comments, venueType, facilities, foodPackages } = req.body;
    const venue = await Venue.create({
        businessName, yourName, email, password, phone, city, comments, venueType, facilities, foodPackages
    });
    if (!venue) {
        throw new ApiError(500, "something went wrong while registering the vendor!!");
    }
    return res.status(201).json(new ApiResponse(200, { venue }, "vendor regiested successfully"));
});
export const Login = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    const venue = await Venue.findOne({ email });
    if (!venue) {
        throw new ApiError(404, "Email/User doesn't exist!!");
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: venue._id }, accessTokenSecret, { expiresIn: '1h' });
    const loggedInVenue = await Venue.findId(venue._id);
    return res.status(200)
        .cookie("accesToken", accessToken)
        .json(new ApiResponse(200, { loggedInVenue, accessToken }, "Here is the vendor"));
});
export const GetVenueById = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const venue = await Venue.findId(id);
    if (!venue) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { venue }, "Here is the Vendor"));
});
export const UpdateVenue = asyncHandler(async (req, res) => {
    const { id } = req.param;
 
    const updateFields = req.body;
    console.log("data", updateFields);
    const givenFiles = req.files;
    const venue = await Venue.findId(id);
    if (!venue) {
        throw new ApiError(404, "No Venue Found!!!");
    }
    if (givenFiles?.length > 0) {
        const imageUrls = await uploadOnCloudnary(givenFiles);
        if (imageUrls)
            venue.images = imageUrls;
    }
    for (const [key, value] of Object.entries(updateFields)) {
        if (key !== '__id' && key !== '__v') {
            venue[key] = value;
        }
    }
    await venue.save();
    return res.status(200).json(new ApiResponse(200, "Venue Updated Successfully!!"));
});
export const DeleteVenueById = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const { user } = req.body;
    const venue = await Venue.findDelete(id);
    if (!venue) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    const respose = await Venue.findIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "Vendor Deleted Successfully "));
});
export const filterVenues = async (req, res) => {
    try {
        const { city, minGuests, maxGuests, foodPackage, facilities, venueTypes } = req.query;
        const filterCriteria = {};
        if (city) {
            filterCriteria.city = city;
        }
        if (minGuests || maxGuests) {
            filterCriteria.guestCapacity = {};
            if (minGuests)
                filterCriteria.guestCapacity.$gte = Number(minGuests);
            if (maxGuests)
                filterCriteria.guestCapacity.$lte = Number(maxGuests);
        }
        if (foodPackage) {
            filterCriteria.foodPackages = foodPackage;
        }
        if (facilities) {
            filterCriteria.facilities = { $all: facilities.split(',') };
        }
        if (venueTypes) {
            filterCriteria.venueType = { $in: venueTypes.split(',') };
        }
        const venues = await Venue.find(filterCriteria);
        res.status(200).json({
            success: true,
            data: venues
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching venues',
            error: error.message
        });
    }
};
export const searchvenuesByCity = async (req, res) => {
    const { city } = req.param;
    try {
        let venues;
        if (city && typeof city === "strings") {
            venues = await Venue.find({ city: city });
        }
        else {
            return res.status(400).json({ message: "City parameter is required and must be a strings" });
        }
        if (!venues || venues.length === 0) {
            return res.status(404).json({ message: "No venues found for the specified city" });
        }
        return res.status(200).json({ venues });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const topVenues = asyncHandler(async (req, res) => {
    const venues = await Venue.find({});
    return res.status(200).json(new ApiResponse(200, venues, "Here are the top Vendors"));
});
