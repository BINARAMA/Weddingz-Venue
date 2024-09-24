import { asyncHandler } from "../utils/asynHandler.js";
import BlogModel from "../models/blogs.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

export const addItemToBloglist = async (req, res) => {
    try {
        const { title, content } = req.body;
        const givenFiles = req.files;
        if (!givenFiles || givenFiles.length === 0) {
            const blog = await BlogModel.create({
                title,
                content,
                images: [],
            });
            return res.status(201).json(new ApiResponse(200, { blog }, "New blog created successfully"));
        }
        
        const imageUrls = await uploadOnCloudinary(givenFiles);
        const blog = await BlogModel.create({
            title,
            content,
            images: imageUrls,
        });
        return res.status(201).json(new ApiResponse(200, { blog }, "New blog created successfully"));
    }
    catch (error) {
        console.error('Error adding item to bloglist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const GetBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new ApiError(404, "No Blog Found!!");
    }
    return res.status(200).json(new ApiResponse(200, { blog }, "Here is the Blog"));
});

export const DeleteblogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new ApiError(404, "No blog Found!!!");
    }
    const response = await BlogModel.find(id);
    return res.status(200).json(new ApiResponse(200, { response }, "blog Deleted Successfully "));
});

export const UpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const givenFiles = req.files;
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new ApiError(404, "No blog Found!!!");
    }
    if (givenFiles?.length > 0) {
        console.log(givenFiles);
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            blog.images = imageUrls;
    }
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '__id' && key !== '__v' && value != undefined) {
            blog[key] = value;
        }
    }
    await blog.save();
    return res.status(200).json(new ApiResponse(200, "blog Updated Successfully!!"));
});

export const getAllBlogs = asyncHandler(async (req, res) => {
    const blog = await BlogModel.find();
    if (!blog || blog.length === 0) {
        throw new ApiError(404, "No blog in DB");
    }
    return res.status(200).json(new ApiResponse(200, { blog }, "here are the blogs."));
});
