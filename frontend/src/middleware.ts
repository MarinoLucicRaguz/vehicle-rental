import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "";

const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";
  const { pathname } = request.nextUrl;

  console.log(request.url);

  if (!token && pathname !== "/login") {
    const response = NextResponse.redirect(
      new URL("/login", request.nextUrl.origin)
    );
    response.cookies.delete("token");
    return response;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    console.log(payload);
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return NextResponse.next();
  } catch (error) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
