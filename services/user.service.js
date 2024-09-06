import { User } from "@/models/user.model";

class userService 
{
    async signup(name, email, password)
    {
        try
        {
            const hashedPassword = await this.hashPassword(password);
            const newUser = await User.create({name, email, password: hashedPassword});  
            return await newUser.save();
        }
        catch(error)
        {
            throw error;
        }
    }

    async googleAuth(name, email, googleId)
    {
        try
        {
            const newUser = await User.create({name, email, googleId});
            return await newUser.save();
        }
        catch(error)
        {
            console.log('error', error)
            throw error;
        }
    }

    async findByEmail(email)
    {
        try
        {
            const user = await User.findOne({email}); 
            return user;
        }
        catch(error)
        {
            throw error
        }
    }

    async findById(id)
    {
        try
        {
            const user = await User.findById(id); 
            return user;
        }
        catch(error)
        {
            throw error
        }
    }

    async hashPassword(password)
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async checkPassword(userPassword, dbPassword)
    {
        const response = await bcrypt.compare(userPassword, dbPassword)
        return response
    }

    async addMockToUser(userId, mockId)
    {
        try
        {
            return await User.findByIdAndUpdate(userId, {$push: {mocks: mockId}}) 
        }
        catch(error)
        {
            throw error
        }
    }

    // async delete(id)
    // {
    //     try
    //     {
    //         return await User.findByIdAndDelete(id);
    //     }
    //     catch(error)
    //     {
    //         throw new Error('Failed to delete user');
    //     }
    // }
}

export default userService