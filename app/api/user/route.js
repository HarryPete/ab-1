import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const userInstance = new userService();

export async function GET(req, res)
{ 
  try
  { 
    await dbConnect();
    const users = await userInstance.findAll()
    return NextResponse.json(users);
  }  
  catch(error)
  { 
    return NextResponse.json({error: error.message});
  } 
}