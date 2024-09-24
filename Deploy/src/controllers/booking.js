import { Booking } from '../models/booking/booking.js';
export const createBooking = async (req, res) => {
    try {
        const { vId, uId, name, contact, location, guests, date, address, message, typeOfEvent } = req.body;
        const existingBooking = await Booking.findOne({ uId, vId });
        if (existingBooking) {
            return res.status(400).json({ error: 'Booking already exists for this uId and vId' });
        }
        const uniqueId = Math.floor(10000 + Math.random() * 90000);
        const newBooking = new Booking({
            vId,
            uId,
            name,
            contact,
            location,
            guests,
            date,
            address,
            message,
            typeOfEvent,
            bookingId: uniqueId
        });
        const savedBooking = await newBooking.save();
        return res.status(201).json({ message: "True", bookingId: savedBooking.bookingId });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        return res.status(200).json(bookings);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getBookingById = async (req, res) => {
    try {
        const vId = req.param;
        const booking = await Booking.find({ vId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json(booking);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//sent enquiry status check
export const getBookingEnquiryStatus = async (req, res) => {
    try {
        const { vId } = req.param;
        const { uId } = req.query;
        if (!vId || !uId) {
            return res.status(400).json({ message: 'vId and uId are required' });
        }
        const booking = await Booking.findOne({ vId, uId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json({ message: "True", bookingId: booking.bookingId });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const updateBookingVerification = async (req, res) => {
    try {
        const vId = req.params; 
        const { uId, bookingId } = req.body;
        const booking = await Booking.find({ });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found for this venueId' });
        }
        if (booking.bookingId == bookingId) {
            booking.isVerified = "Approve";
            const updateBooking = await booking.save();
            return res.status(200).json(updateBooking.isVerified);
        }
        else if (bookingId == "Reject") {
            console.log("rejected", bookingId);
            booking.isVerified = "Reject";
            const updateBooking = await booking.save();
            return res.status(500).json(updateBooking.isVerified);
        }
        else if (booking.bookingId != bookingId) {
            return res.status(500).json("Code not valid");
        }
        else {
            booking.isVerified = "Pending";
            return res.status(500).json("Request still in Pending State");
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
