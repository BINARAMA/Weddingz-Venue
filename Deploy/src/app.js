import cors from "cors";
import { config } from "dotenv";
import connectionDB from "./db/connect.js";
import express from "express";
config({
    path: "./.env",
});

const app = express();
const port = process.env.PORT || 8000;
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
connectionDB()
    .then(() => {
    app.listen(port, () => {
        console.log(`The server is listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error( error);
    process.exit(1);
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
import vendorRoutes from "./routes/vendor.js";
import venueRoutes from "./routes/venue.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import wishlistRoutes from './routes/wishlist.js';
import adminRoutes from './routes/admin.js';
import blogRoutes from './routes/blog.js';
import enquiryRoutes from './routes/enquiry.js';
import realWeddingsRoutes from './routes/realweddings.js';
import bookingsRoutes from './routes/booking.js';
app.use("/api/api/v1/vendor", vendorRoutes);
app.use("/api/api/v1/venue", venueRoutes);
app.use("/api/api/v1/user", userRoutes);
app.use("/api/api/v1/notification", notificationRoutes);
app.use("/api/api/v1/", wishlistRoutes);
app.use("/api/api/v1/admin", adminRoutes);
app.use("/api/api/v1/enquiry", enquiryRoutes);
app.use("/api/api/v1/blog", blogRoutes);
app.use("/api/api/v1/weddingpost", realWeddingsRoutes);
app.use("/api/api/v1/bookings", bookingsRoutes);