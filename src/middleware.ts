// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that don't require authentication
const publicPaths = ["/"];

export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Check if user is authenticated from cookies
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  // Redirect to login if not authenticated and trying to access a protected route
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to home if already authenticated and trying to access login
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - Static files (_next/static, _next/image, favicon.ico)
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
