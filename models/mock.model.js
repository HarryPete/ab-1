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
    assessment:
    {
        type: [Schema.Types.Mixed]
    },
    result:
    {
        type: [Schema.Types.Mixed]
    },
},
{
    timestamps: true
})

export const Mock = mongoose.models?.Mock || mongoose.model('Mock', mockSchema);