import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    comments: [{
        text: { type: String, required: true },
        postedBy: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
});

export default mongoose.model('Blog', blogSchema);
