import mongoose from 'mongoose';
import Campfire from '../models/campfire.js';

export const fetchCampfires = async (req, res) => {
    // res.send('THIS WORKS!');
    try {
        const campfires = await Campfire.find();
        res.status(200).json({ success: true, data: campfires });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchCampfireById = async (req, res) => {
    const { id } = req.params;
    try {
        const campfire = await Campfire.findById(id);
        res.status(200).json(campfire);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createCampfire = (req, res) => {
    const campfire = req.body;
    const newCampfire = new Campfire(campfire);
    try {
        newCampfire.save();
        res.status(201).json(newCampfire);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateCampfire = async (req, res) => {
    const { id: _id } = req.params;
    const campfire = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        const updatedCampfire = await Campfire.findByIdAndUpdate(_id, campfire, { new: true });
        res.status(201).json(updatedCampfire);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteCampfire = async (req, res) => {
    const { id: _id } = req.params;
    console.log(req.params, 'req.params');
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        await Campfire.findByIdAndDelete(_id);
        res.status(201).json({ message: 'Campfire deleted successfully!' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
