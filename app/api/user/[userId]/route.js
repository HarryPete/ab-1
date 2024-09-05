import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import userService from "@/services/user.service";
const userInstance = new userService();

export async function GET(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const user = await userInstance.findById(userId);
        return NextResponse.json(user)
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}

export async function PUT(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const { questions } = await req.json();
        const user = await userInstance.findById(userId);
        return NextResponse.json(user)
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}