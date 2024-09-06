import { Feedback } from "@/models/feedback.model";

class feedbackService
{
    async addFeedback(user, rating, feedback)
    {
        try
        {
            const newFeedback = await Feedback.create({user, rating, feedback})
            return await newFeedback.save();
        }
        catch(error)
        {
            throw error
        }
    }

    // async getFeedbackById(mockId)
    // {
    //     try
    //     {
    //         const mock = await Feedback.findById(mockId)
    //         return mock;
    //     }
    //     catch(error)
    //     {
    //         throw error
    //     }
    // }

    async getAllFeedbacks()
    {
        try
        {
            const mock = await Feedback.findById(mockId)
            return mock;
        }
        catch(error)
        {
            throw error
        }
    }
}

export default feedbackService