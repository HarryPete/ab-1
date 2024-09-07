'use server'

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function doLogout() 
{
  await signOut({ redirectTo: "/" });
}

export async function googleLogin()
{
    await signIn('google', {redirectTo: '/dashboard'});
} 

export async function credentialLogin(formData) 
{
    try 
    {
       await signIn("credentials", 
        {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: '/dashboard',
        });
    } 
    catch (error) 
    {
        if (error instanceof AuthError) 
        {
            if (error.cause?.err instanceof Error) 
                return error.cause.err.message;
          
            switch (error.type) 
            {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
      }
};