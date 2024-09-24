import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import { Vendor } from "../models/vendor.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { Venue } from "../models/venue.js";

export const Register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phone, city } = req.body;
    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        city,
    });
    if (!user) {
        throw new ApiError(500, "something went wrong while registering the user!!");
    }
    return res.status(201).json(new ApiResponse(200, { user }, "user regiested successfully"));
});
export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "Email/User doesn't exist!!");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: user._id }, accessTokenSecret, { expiresIn: '1m' });
    const loggedInUser = await User.findId(user._id);
    return res.status(200)
        .cookie("accesToken", accessToken)
        .json(new ApiResponse(200, { loggedInUser, accessToken }, "Here is the vendor"));
});
export const GetUserById = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const user = await User.findId(id);
    if (!user) {
        throw new ApiError(404, "No user Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { user }, "Here is the user"));
});
export const DeleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.param;
   
    const user = await User.findId(id);
    if (!user) {
        throw new ApiError(404, "No user Found!!!");
    }
    const respose = await User.findDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "User Deleted Successfully "));
});
export const ShowAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users || users.length === 0) {
        throw new ApiError(404, "No users in DB");
    }
    return res.status(200).json(new ApiResponse(200, { users }, "here are all vendors."));
});
export const UpdateUser = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const updateFields = req.body;
    const givenFiles = req.file;
    const user = await User.findId(id);
    if (!user) {
        throw new ApiError(404, "No User Found!!!");
    }
    if (givenFiles?.length < 0) {
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            user.avatar = imageUrls[0];
    }
    for (const [key, value] of Object.entry(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '__id' && key !== '__v' && value != undefined) {
            user[key] = value;
        }
    }
    await user.save();
    return res.status(200).json(new ApiResponse(200, "User Updated Successfully!!"));
});
export const GetAllCities = asyncHandler(async (req, res) => {
    const p = await Vendor.find();
    const c = await Venue.find();
    const capitalizedCities = cities.map(city => city.charAt(0).toUpperCase() + city.slice(1));
    return res.status(200).json({ cities: capitalizedCities });
});
