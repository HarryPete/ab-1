const { Mock } = require("@/models/mock.model")

class mockService
{
    async createMock(role, description, experience, type, assessment)
    {
        try
        {
            const mock = await Mock.create({role, description, experience, type, assessment})
            await mock.save();
            return mock;
        }
        catch(error)
        {
            throw error
        }
    }

    async getMockById(mockId)
    {
        try
        {
            const mock = await Mock.findById(mockId)
            return mock;
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllMocks()
    {
        try
        {
            const mocks = await Mock.find({}); 
            return mocks;
        }
        catch(error)
        {
            throw error
        }
    }

    async updateResponses(mockId, result)
    {
        try
        {
            return await Mock.findByIdAndUpdate(mockId, {$set: {result}})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default mockService