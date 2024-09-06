import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import feedbackService from "@/services/feedback.service";
const feedbackInstance = new feedbackService();

export async function GET(req, res)
{ 
  try
  { 
    await dbConnect();
    const feedbacks = await feedbackInstance.getAllFeedbacks()
    return NextResponse.json(feedbacks);
  }  
  catch(error)
  { 
    return NextResponse.json({error: error.message});
  } 
}