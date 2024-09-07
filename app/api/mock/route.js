import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import mockService from "@/services/mock.service";
const mockInstance = new mockService();

export async function GET(req, res)
{ 
  try
  { 
    await dbConnect();
    const mocks = await mockInstance.getAllMocks()
    return NextResponse.json(mocks);
  }  
  catch(error)
  { 
    return NextResponse.json({error: error.message});
  } 
}