import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authService } from "./services/authService";

export async function middleware(request: NextRequest) {
  const authPaths = ["/login", "/register"];
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (authPaths.includes(pathname)) {
    if (token) {
      const isValidToken = await validateToken(token);
      if (isValidToken) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  if (token) {
    const isValidToken = await validateToken(token);
    if (isValidToken) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

async function validateToken(token: string) {
  try {
    const { success, data } = await authService.validate(token);
    console.log(data);
    return success && data;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
