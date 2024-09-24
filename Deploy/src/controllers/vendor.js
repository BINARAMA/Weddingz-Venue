import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import jwt from 'jsonwebtoken';
export const generateAccessAndRefreshTokens = async (vendorId) => {
    try {
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        const accessToken = vendor.generateAccessToken();
        const refreshToken = vendor.generateRefreshToken();
        vendor.refreshToken = refreshToken;
        await vendor.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error("Something went wrong while generating the access token");
    }
};

export const Register = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone, city, type_Of_Business, businessName } = req.body;
    
    const vendor = await Vendor.create({
        name,
        email,
        password,
        phone,
        city,
        type_Of_Business,
        businessName
    });
    if (!vendor) {
        throw new ApiError(500, "something went wrong while registering the vendor!!");
    }
    return res.status(201).json(new ApiResponse(200, { vendor }, "vendor regiested successfully"));
});

export const Login = asyncHandler(async (req, res) => {
    const { email} = req.body;
    if (!email) {
        throw new ApiError(400, "Email is missing!!");
    }   
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
        throw new ApiError(404, "Email/Vendor doesn't exist!!");
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: vendor._id }, accessTokenSecret, { expiresIn: '1m' });
    const loggedInVendor = await Vendor.findById(vendor._id);
    return res.status(200)
        .cookie('authToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge:  60 * 60,
    })
        .json(new ApiResponse(200, { loggedInVendor, accessToken }, "Here is the vendor"));
});

export const UpdateVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const givenFiles = req.files;
    const vendor = await Vendor.findById(id);
    if (vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    if (givenFiles?.length > 0) {
        console.log(givenFiles);
        const imageUrls = await uploadOnCloudnary(givenFiles);
        console.log("cloud", imageUrls);
        if (imageUrls)
            vendor.portfolio = imageUrls;
    }
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '__id' && key !== '__v' && value != undefined) {
            vendor[key] = value;
        }
    }
    await vendor.save();
    return res.status(200).json(new ApiResponse(200, "Vendor Updated Successfully!!"));
});

export const GetVendorById = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { vendor }, "Here is the Vendor"));
});

export const DeleteVendorById = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    const respose = await Vendor.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "Vendor Deleted Successfully "));
});

export const ShowAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find();
    if (!vendors || vendors.length === 0) {
        throw new ApiError(404, "No vendors in DB");
    }
    return res.status(200).json(new ApiResponse(200, { vendors }, "here are all vendors."));
});

export const searchVendorsByCity = async (req, res) => {
    const { city } = req.param;
    try {
        let vendors;
        if (city && typeof city === "string") {
            vendors = await Vendor.find({ city: city });
        }
        else {
            return res.status(400).json({ message: "City parameter is required and must be a string" });
        }
        if (vendors && vendors.length === 0) {
            return res.status(404).json({ message: "No vendors found for the specified city" });
        }
        return res.status(200).json({ vendors });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const GetVendorByType = asyncHandler(async (req, res) => {
    const type = req.params.type_Of_Business;
    const vendors = await Vendor.find({ type_Of_Business: type });
    if (vendors && vendors.length === 0) {
        throw new ApiError(404, "No Vendors Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { vendors }, "Here are the Vendors by type"));
});

