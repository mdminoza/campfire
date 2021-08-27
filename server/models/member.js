import mongoose from 'mongoose';

const memberSchema = mongoose.Schema({
    profileUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    role: {
        type: String,
        default: 'audience'
    },
    campfire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campfire',
        required: true,
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
