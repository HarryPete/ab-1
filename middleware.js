import NextAuth from "next-auth"
import { cookies } from "next/headers"
import { encode, decode } from 'next-auth/jwt'
import { NextResponse } from "next/server";
import { adminRoutes, authRoutes, protectedRoutes, userRoutes } from "./routes";

export default async function auth(req)
{
    const { nextUrl } = req
    const cookie = cookies()?.get('__Secure-authjs.session-token');
    // const cookie = cookies()?.get('authjs.session-token');
    
    let user=null;
    if(cookie)
    {
        user = await decode({
            token: cookie.value,
            salt: cookie.name,
            secret: process.env.AUTH_SECRET
        })
    } 

    const userRoute = userRoutes.some((route)=> nextUrl.pathname.startsWith(route));
    // const adminRoute = protectedRoutes.some((route)=> nextUrl.pathname.startsWith(route));
    const authRoute = authRoutes.some((route)=> nextUrl.pathname.startsWith(route));
       
    if(!user && userRoute)
        return NextResponse.redirect(new URL('/login', nextUrl))

    if(user && authRoute)
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
    
    // if(adminRoute)
    //     return NextResponse.redirect(new URL('/', nextUrl))
    
        // if(user.role === 'admin' && nextUrl.pathname.startsWith('/dashboard'))
        //     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))

        // if(nextUrl.pathname.startsWith('/admin'))
        //     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))
    return null
    
}

export const config = {
    matcher: ['/((?! .+\\. [\\w]+$ |_next).*)', '/', '/(api|trpc) (.*)']
} 


// 