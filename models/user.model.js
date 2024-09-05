import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: 
    {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true
    },
    password: 
    {
        type: String
    },
    phone:
    {
        type: Number
    },
    role:
    {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    googleId: String,
    mocks:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Mock'
    }]
},
{
    timestamps: true
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema);