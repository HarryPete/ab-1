import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    user:
    {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating:
    {
        type: String, 
        required: true
    },
    feedback:
    {
        type: String, 
        required: true
    }
},
{
    timestamps: true
})

export const Feedback = mongoose.models?.Feedback || mongoose.model('Feedback', feedbackSchema);