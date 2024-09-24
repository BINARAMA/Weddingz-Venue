import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.js";
import NotificationModel from "../models/notification/notification.js";
import { Venue } from "../models/venue.js";
export const postNotification = asyncHandler(async (req, res, next) => {
    try {
        const { userId, city, flag } = req.body;
        let vendorIds = [];
        let venueIds = [];
        if (flag === "vendor") {
            const vendors = await Vendor.find({ city });
            if (!vendors.length) {
                return res.status(404).json({ error: "No vendors found" });
            }
            vendorIds = vendors.map((vendor) => vendor._id);
        }
        else if (flag === "venue") {
            const venues = await Venue.find({ city });
            if (!venues.length) {
                return res.status(404).json({ error: "No venues found" });
            }
            venueIds = venues.map((venue) => venue._id);
        }
        else {
            return res.status(400).json({ error: "Invalid flag value" });
        }
        let existingNotification = await NotificationModel.findOne({ userId });
            if (!existingNotification.city.includes(city)) {
                existingNotification.city.push(city);
                if (flag === "vendor") {
                    vendorIds.forEach((vendorId) => {
                        if (existingNotification?.vendors?.some((vendor) => vendor.vendorId === String(vendorId))) {
                            existingNotification.vendors.push({ vendorId, status: "unread" });
                        }
                    });
                }
                else if (flag === "venue") {
                    venueIds.forEach((venueId) => {
                        if (existingNotification?.venues?.some((venue) => String(venue.venueId) === String(venueId))) {
                            existingNotification.venues.push({ venueId, status: "unread" });
                        }
                    });
                }
            }
            const existingCities = existingNotification.city;
            for (const existingCity of existingCities) {
                    const vendorsForCity = await Vendor.find({ city: existingCity });
                    vendorsForCity.forEach((vendor) => {
                        if (existingNotification?.vendors?.some((v) => String(v.vendorId) === String(vendor._id))) {
                            existingNotification.vendors.push({ vendorId: vendor._id, status: "unread" });
                        }
                    });
                    const venuesForCity = await Venue.find({ city: existingCity });
                    venuesForCity.forEach((venue) => {
                        if (existingNotification?.venues?.some((v) => String(v.venueId) === String(venue._id))) {
                            existingNotification.venues.push({ venueId: venue._id, status: "unread" });
                        }
                });
            }
        existingNotification = await existingNotification.save();
        res.status(201).json({ notification: existingNotification });
    }
    catch (error) {
        next(error);
    }
});
export const getNotification = asyncHandler(async (req, res, next) => {
    try {
        const { vId } = req.param;
        const vendorNotifications = await NotificationModel.find({
            "vendors": vId,
        });
        const venueNotifications = await NotificationModel.find({
            "venues": vId,
        });
        const notifications = [vendorNotifications, venueNotifications];
        const users = await Promise.all(notifications.map(notification => User.findById(notification.userId)));
        const usersWithNotification = users.map((user, index) => ({
            user,
            notificationId: notifications[index]._id
        }));
        console.log(usersWithNotification);
        res.json({ users: usersWithNotification });
    }
    catch (error) {
        next(error);
    }
});
export const updateNotification = asyncHandler(async (req, res, next) => {
    try {
        const { vId, nId } = req.body;
        let notification = await NotificationModel.findById(nId);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            const vendorToUpdate = notification?.vendors?.find((vendor) => vendor.vendorId === nId);
            const venueToUpdate = notification?.venues?.find((venue) => venue.venueId === vId);
                vendorToUpdate.status = "";
                const updatedNotification = await notification.save();
                res.status(200).json({
                    success: true,
                    status: updatedNotification,
                });
             if (venueToUpdate) {
                venueToUpdate.status = "read";
                const updatedNotification = await notification.save();
                res.status(200).json({
                    success: true,
                    status: updatedNotification,
                });
            }
            else {
                return next("Vendor not found in the notification");
            }
        }
    }
    catch (error) {
        next(error);
    }
});
export const getNotificationByIdStatus = asyncHandler(async (req, res, next) => {
    try {
        const { nId } = req.param;
        const vId = req.query;
        const notification = await NotificationModel.findById(nId);
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        let status;
        if (notification.vendors && !notification.vendors.some(vendor => vendor === vId)) {
            const vendor = notification.vendors.find(vendor => vendor === vId);
            status = vendor?.status;
        }
        else if (notification.venues && !notification.venues.some(venue => venue === vId)) {
            const venue = notification.venues.find(venue => venue === vId);
            status = venue?.status;
        }
        else {
            return res.status(404).json({ success: false, message: 'Vendor or Venue not found in the notification' });
        }
        // Return the status
        res.status(200).json({ success: true, status });
    }
    catch (error) {
        next(error);
    }
});
export const getAllNotificationsByVendorId = asyncHandler(async (req, res, next) => {
    try {
        const { vId } = req.param;
        const vendorNotifications = await NotificationModel.find({
            "vendors": vId,
        });
        const venueNotifications = await NotificationModel.find({
            "venues": vId,
        });
        const notifications = [vendorNotifications, venueNotifications];
        res.status(200).json({
            success: true,
            status: notifications,
        });
    }
    catch (error) {
        next(error);
    }
});
