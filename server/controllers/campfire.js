import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
import Campfire from '../models/campfire.js';

export const fetchCampfires = async (req, res, next) => {
    try {
        const campfires = await Campfire.find();
        res.status(200).json(campfires);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const fetchCampfireById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campfire = await Campfire.findById(id);
        res.status(200).json(campfire);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const createCampfire = async (req, res, next) => {
    const campfire = req.body;
    const newCampfire = new Campfire(campfire);
    try {
        await newCampfire.save();
        res.status(201).json(newCampfire);
    } catch (error) {
        next(error);
    }
};

export const updateCampfire = async (req, res, next) => {
    const { id: _id } = req.params;
    const campfire = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        const updatedCampfire = await Campfire.findByIdAndUpdate(_id, campfire, { new: true });
        res.status(200).json(updatedCampfire);
    } catch (error) {
        next(error);
    }
};

export const deleteCampfire = async (req, res, error) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        await Campfire.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Campfire deleted successfully!' });
    } catch (error) {
        next(error);
    }
};
