import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    imggif: {
        type: String,
    },
    video: {
        type: String,
       
    },
    poll_id: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const tweets = mongoose.model('tweets', createSchema);

export default tweets;