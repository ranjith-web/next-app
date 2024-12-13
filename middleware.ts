import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import the JWT token from NextAuth

// export async function middleware(req: any) {
//     // Get the token from the request (JWT)
//     const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//     const { nextUrl } = req;
    
//     // If no token is found, the user is not authenticated
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page if not authenticated
//     }
  
//     // Check if the user is trying to access a route that requires a specific role (e.g., admin)
//     console.log("pathname--->", nextUrl.pathname.startsWith('/dashboard/invoices'), "role--->", token?.role)
//     if (nextUrl.pathname.startsWith('/dashboard/invoices') && token?.role !== 'admin') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to unauthorized page if not admin
//     }
  
//     // If everything checks out, allow the request to continue
//     return NextResponse.next();
// }