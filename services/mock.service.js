const { Mock } = require("@/models/mock.model")

class mockService
{
    async createMock(role, description, experience, type, query)
    {
        try
        {
            const mock = await Mock.create({role, description, experience, type, query})
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
}

export default mockService