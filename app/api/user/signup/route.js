import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import userService from "@/services/user.service";
const userInstance = new userService();

export async function POST(req) 
{
    try
    {
        await dbConnect()

        const {name, email, password} = await req.json();
        const user = await userInstance.findByEmail(email);
        if(user)
            return NextResponse.json({message: 'Email already in use', status: 400});
        await userInstance.signup(name, email, password)
        return NextResponse.json({message: 'User registered', status : 201});
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}