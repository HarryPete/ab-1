import { Feedback } from "@/models/feedback.model";

class feedbackService
{
    async addFeedback(user, rating, feedback, isPay)
    {
        try
        {
            const newFeedback = await Feedback.create({user, rating, feedback, isPay})
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
            const feedbacks = await Feedback.find({})
            return feedbacks;
        }
        catch(error)
        {
            throw error
        }
    }
}

export default feedbackService