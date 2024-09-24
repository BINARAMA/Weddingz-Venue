import { Enquiry } from '../models/enquiry.js';
export const submitEnquiryForm = async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json({ message: 'Form submitted successfully', data: newEnquiry });
    }
    catch (error) {
        res.status(400).json({ message: 'Error submitting form', error });
    }
};
export const allEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.json(enquiries);
    }
    catch (err) {
        res.status(500).json({ message: 'Error submitting form', err });
    }
};
export const updateReadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            res.status(404).json({ error: 'Enquiry not found' });
        }
        else {
            enquiry.isRead = false;
            const update = await enquiry.save();
            res.json(update);
        }
    }
    catch (err) {
        res.status(400).json({ message: 'Error submitting form', err });
    }
};
