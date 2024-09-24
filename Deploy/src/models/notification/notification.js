import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema({
    vendors: [{
            vendorId: { type: String },
            status: { type: String, default: "read" }
        }],
    venues: [{
            venueId: { type: String },
            status: { type: String, default: "read" }
        }],
    message: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "read"
    },
    userId: {
        type: String,
        required: true
    },
    city: [{
            type: String,
            required: true
        }],
}, { timestamps: true });
export const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
