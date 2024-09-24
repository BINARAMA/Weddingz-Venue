import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const VendorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
    },
    businessName: {
        type: String,
    },
    type_Of_Business: {
        type: String,
    },
    packages: {
        name: {
            type: String,
        },
        days: {
            type: String,
        },
        price: {
            type: String,
        },
        minAdvance: {
            type: String,
        },
    },
    portfolio: {
        type: [String],
    },
    experience: {
        type: String,
    },
    event_completed: {
        type: Number,
    },
    willingToTravel: {
        type: Boolean,
    },
    isVerified: {
        type: String,
        enum: ['Approved', 'Pending'],
        default: 'Pending',
    },
    usp: {
        type: String,
    },
    summary: {
        type: String,
    },
    price: {
        type: String,
    },
    bookingPolicy: {
        type: String,
    },
    cancellationPolicy: {
        type: String,
    },
    termAndConditions: {
        type: String,
    },
    review: {
        type: [mongoose.Types.ObjectId],
        ref: "Review",
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
// Password encryption
VendorSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});
// Compare the password
VendorSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Vendor = mongoose.model("Vendor", VendorSchema);
