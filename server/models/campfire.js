import mongoose from 'mongoose';

const campfireSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    altTopic: {
        type: String,
        required: true,
    },
    duration: String,
    description: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    hidden: Boolean,
    isDeleted: Boolean,
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    scheduleToStart: {
        type: Date,
        default: new Date(),
    },
    openTo: {
        type: String,
        default: 'Everyone',
    },
});

const Campfire = mongoose.model('Campfire', campfireSchema);

export default Campfire;
