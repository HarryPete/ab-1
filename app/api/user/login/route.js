import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const userInstance = new userService();

export async function POST(request)
{
     
     try
     {
          await dbConnect();

          const {email, password} = await request.json();
             
          const user = await userInstance.findByEmail(email);
          if(!user)
               return NextResponse.json({message: 'User not found'})
                 
          const isPasswordMatching = userInstance.checkPassword(user.password, password);
          if(!isPasswordMatching)
               return NextResponse.json({message: 'Email or password incorrect'})
          return NextResponse.json({message: 'Logged in', user}, {status: 201})
     }
     catch(error)
     {
          return NextResponse.json({message: error.message})
     }     
}
