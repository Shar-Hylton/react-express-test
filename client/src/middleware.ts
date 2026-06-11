import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest){
    const sessionCookie = req.cookies.get("connect.sid");

    if (!sessionCookie){
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        )
    }

    return NextResponse.next();

}

export const config = {
  matcher: ["/notes/:path*"],
};