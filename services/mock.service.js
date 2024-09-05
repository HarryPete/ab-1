const { Mock } = require("@/models/mock.model")

class mockService
{
    async createMock()
    {
        try
        {
            const mock = await Mock.create({role, description, experience, type, questions})
            await mock.save();
            return mock;
        }
        catch(error)
        {
            throw error
        }
    }
}

export default mockService