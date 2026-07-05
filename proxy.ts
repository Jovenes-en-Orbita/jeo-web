import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-jovenes-en-orbita-platform-2026';
const secret = new TextEncoder().encode(JWT_SECRET);

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match dashboard paths: /es/dashboard, /en/dashboard, etc.
  const isDashboard = pathname.endsWith("/dashboard") || pathname.includes("/dashboard/");

  if (isDashboard) {
    const sessionToken = request.cookies.get("session")?.value;

    if (!sessionToken) {
      // Redirect to main locale home page
      const segments = pathname.split("/");
      const locale = segments[1] || "es";
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    try {
      // Verify token
      await jwtVerify(sessionToken, secret);
    } catch (err) {
      // Clear invalid token and redirect
      const segments = pathname.split("/");
      const locale = segments[1] || "es";
      const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  // Run the localization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
    // - files with extensions (e.g. .png, .jpg, .css, .js)
    "/((?!api|_next|_vercel|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
