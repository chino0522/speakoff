import { NextRequest, NextResponse } from 'next/server';
import authConfig from './auth.config';
import NextAuth, { NextAuthRequest } from 'next-auth';

const protectedRoutes = ["/create-room", "/profile"]

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    // // custom middleware logic goes here

    // const isLoggedIn = !!req.auth
    // const isProtectedRoutes = protectedRoutes.some((route) => {
    //     return req.nextUrl.pathname.startsWith(route)
    // })

    // if (!isLoggedIn && isProtectedRoutes) {
    //     return NextResponse.redirect(new URL("/", req.url))
    // }

    // return NextResponse.next();
})

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};