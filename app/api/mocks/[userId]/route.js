import dbConnect from "@/dbConfig/dbConnect";
import mockService from "@/services/mock.service";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const mockInstance = new mockService();
const userInstance = new userService();

export async function POST(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const { role, description, experience, type, questions } = await req.json();
        const mock = await mockInstance.createMock(role, description, experience, type, questions) 
        await userInstance.addMockToUser(userId, mock._id);
        return NextResponse.json({message: 'Mock interview created'})
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}