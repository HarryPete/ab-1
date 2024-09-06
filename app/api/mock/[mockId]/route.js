import dbConnect from "@/dbConfig/dbConnect";
import mockService from "@/services/mock.service";
import { NextResponse } from "next/server";
const mockInstance = new mockService();

export async function PUT(req, {params}) 
{
    const { mockId } = params
    
    try
    {
        await dbConnect();
        const { responses }  =await req.json();
        const mock = await mockInstance.updateResponses(mockId, responses);
        return NextResponse.json({message: 'Submitted successfully'});
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req, {params}) 
{
    const { mockId } = params
    
    try
    {
        await dbConnect();
        const mock = await mockInstance.getMockById(mockId);
        return NextResponse.json(mock);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}