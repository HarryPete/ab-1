import mongoose, { Schema } from "mongoose";

const mockSchema = new Schema({
    role:
    {
        type: String, 
        required: true
    },
    description:
    {
        type: String, 
        required: true
    },
    experience:
    {
        type: String, 
        required: true
    },
    type:
    {
        type: String, 
        required: true
    },
    questions:
    [{
        type: String,
        required: true
    }],
    responses:
    [{
        type: String,
        required: true
    }]
},
{
    timestamps: true
})

export const Mock = mongoose.models?.Mock || mongoose.model('Mock', mockSchema);