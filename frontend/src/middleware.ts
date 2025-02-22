import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authService } from "./services/authService";

export async function middleware(request: NextRequest) {
  const authPaths = ["/login", "/register"];
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isValidToken = token
    ? await (async () => {
        try {
          const { success, data } = await authService.validate(token);
          return success && data?.valid;
        } catch {
          return false;
        }
      })()
    : false;

  if (authPaths.includes(pathname)) {
    return isValidToken ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
  }
  return token && isValidToken ? NextResponse.next() : NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
