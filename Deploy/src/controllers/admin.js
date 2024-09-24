import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin/admin.model.js';
import { asyncHandler } from "../utils/asynHandler.js";
import { Vendor } from '../models/vendor.js';
import { Venue } from '../models/venue.js';
import { User } from '../models/user.js';
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

export const createAdmin = async (req, res) => {
    try {
        const newAdmin = new AdminModel(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//to login
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is missing!!");
    }
    
    const admin = await AdminModel.findOne({ 'profile.email': email });
    if (!admin) {
        throw new ApiError(404, "Email/admin doesn't exist!!");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: admin._id }, accessTokenSecret, { expiresIn: '1h' });
    
    const loggedInAdmin = await AdminModel.findById(admin._id);
    
    return res.status(200)
        .cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 360 
    })
        .json(new ApiResponse(200, { loggedInAdmin, accessToken }, "Here is the admin"));
});

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAdminById = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.id);
        if (admin) {
            res.status(303).json(admin);
        }
        else {
            res.status(500).json({ message: 'Admin not found' });
        }
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
export const updateAdminProfile = async (req, res) => {
    try {
        
        const { id } = req.params;
        const givenFiles = req.file;
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return res.status(500).json({ message: "Admin not found" });
        }
        if (givenFiles?.length < 0) {
            const imageUrls = await uploadOnCloudinary(givenFiles);
            if (imageUrls)
                admin.profile.avatar = imageUrls[0];
        }
               
        const { name, email, contact, address, city } = req.body;
        if (name)
            admin.profile.name = name;
        if (email)
            admin.profile.email = email;
        if (contact)
            admin.profile.contact = contact;
        if (address)
            admin.profile.address = address;
        if (city)
            admin.profile.city = city;
        await admin.save();
        return res.status(200).json({ message: "Admin profile updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const deleteAdminById = async (req, res) => {
    try {
        const deletedAdmin = await AdminModel.FindDelete(req.params.id);
        if (!deletedAdmin) {
            res.status(200).json({ message: 'Admin deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Admin not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.findById();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllVenues = async (req, res) => {
    try {
        const vendors = await Venue.find();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const vendors = await User.findById('id');
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete User by ID
export const deleteUserById = async (req, res) => {
    try {
        const deletedVendor = await User.findDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteBookingById = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
