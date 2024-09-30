import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import userService from "./services/user.service"
import dbConnect from "./dbConfig/dbConnect";
import { CredentialsSignin } from "next-auth";
const userInstance = new userService();
 
export default { 
    providers:
    [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            }
        },
    ),
        Credentials({
            credentials:
            {
                email: {},
                password: {}    
            },
            async authorize(credentials)
            {
                try
                {
                    await dbConnect();

                    const { email, password } = credentials;
                    if(email && password)
                    {
                        const user = await userInstance.findByEmail(email)
                        if(!user)
                            throw new CredentialsSignin('User not found')
                        
                        const isMatch = await userInstance.checkPassword(password, user.password);
                        if(!isMatch)
                            throw new CredentialsSignin('Invalid email or password')
                        return user
                    }   
                }
                catch(error)
                {
                    throw new CredentialsSignin(error.mesage || 'Something went wrong')
                }
            }
        })
    ] }