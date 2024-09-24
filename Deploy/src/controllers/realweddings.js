import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { asyncHandler } from "../utils/asynHandler.js";
import RealWeddingsModel from "../models/realweddings.js";

export const addItemToRealWeddingsPost = async (req, res) => {
    try {
        const { title, content, author, eventDate, organizerName } = req.body;
        const givenFiles = req.files;
        if (!givenFiles || givenFiles.length === 0) {
   
            const realWeddings = await RealWeddingsModel.create({
                title,
                content,
                author,
                eventDate,
                organizerName,
                images: [],
            });
            return res.status(201).json(new ApiResponse(200, { realWeddings }, "New realWeddings created successfully"));
        }
        const imageUrls = await uploadOnCloudinary(givenFiles);
        const realWeddings = await RealWeddingsModel.create({
            title,
            content,
            author,
            eventDate,
            organizerName,
            images: imageUrls,
        });
        return res.status(201).json(new ApiResponse(200, { realWeddings }, "New realWeddings created successfully"));
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const GetRealWeddingsPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const realWeddings = await RealWeddingsModel.findId(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!");
    }
    return res.status(200).json(new ApiResponse(200, { realWeddings }, "Here is the realWeddings"));
});
export const DeleteRealWeddingsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const realWeddings = await RealWeddingsModel.findId(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!!");
    }
    const response = await RealWeddingsModel.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { response }, "realWeddings Deleted Successfully "));
});
export const UpdateRealWeddingsPost = asyncHandler(async (req, res) => {
    const { id } = req.param;
    const updateFields = req.body;
    const givenFiles = req.file;
    const realWeddings = await RealWeddingsModel.findId(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!!");
    }
    if (givenFiles?.length < 0) {
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            realWeddings = imageUrls;
    }
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '__id' && key !== '__v' && value != undefined) {
            realWeddings[key] = value;
        }
    }
    await realWeddings.save();
    return res.status(200).json(new ApiResponse(200, "realWeddings Updated Successfully!!"));
});
export const getAllRealWeddings = asyncHandler(async (req, res) => {
    const realWeddings = await RealWeddingsModel.find();
    if (!realWeddings || realWeddings.length === 0) {
        throw new ApiError(404, "No realWeddings in DB");
    }
    return res.status(200).json(new ApiResponse(200, { realWeddings }, "here are the realWeddings."));
});
