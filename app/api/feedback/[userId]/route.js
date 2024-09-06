import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import feedbackService from "@/services/feedback.service";
const feedbackInstance = new feedbackService();

export async function POST(req, {params})
{ 
  try
  { 
    await dbConnect();
    const { userId } = params;
    const { rating, feedback } = await req.json();
    await feedbackInstance.addFeedback(userId, rating, feedback)
    return NextResponse.json({message: 'Feedback recorded'});
  }  
  catch(error)
  { 
    return NextResponse.json({error: error.message});
  } 
}