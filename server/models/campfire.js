import mongoose from 'mongoose';

const campfireSchema = mongoose.Schema({
    topic: String,
    altTopic: String,
    duration: String,
    description: String,
    creatorId: String,
    description: String,
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
    scheduleToStart: Date,
    openTo: String,
});

const Campfire = mongoose.model('Campfire', campfireSchema);

export default Campfire;
