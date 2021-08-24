import mongoose from 'mongoose';
import Member from '../models/member.js';
import { handleValidationError } from '../middleware/error.js';

export const fetchMemberById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const member = await Member.findById(id);
        res.status(200).json(member);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const fetchMembersByCampfireId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const members = await Member.find({ campfire: id });
        res.status(200).json(members);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const addMember = async (req, res, next) => {
    try {
        const member = req.body;
        const newMember = new Member(member);
        await newMember.save();
        res.status(200).json(newMember);
    } catch (error) {
        next(error);
    }
};

export const updateMember = async (req, res, next) => {
    const { id: _id } = req.params;
    const member = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        const updatedMember = await Member.findByIdAndUpdate(_id, member, { new: true });
        res.status(200).json(updatedMember);
    } catch (error) {
        next(error);
    }
};

export const deleteMember = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        await Member.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        next(error);
    }
};
