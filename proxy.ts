import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPrefixes = ["/admin"];

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/mensajes")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set(
        "callbackUrl",
        request.nextUrl.pathname + request.nextUrl.search,
      );

      return applySecurityHeaders(NextResponse.redirect(url));
    }
  }

  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const hasAccess = request.cookies.get("atelier_access")?.value === "granted";

  if (isProtectedRoute && !hasAccess) {
    const url = request.nextUrl.clone();
    url.pathname = "/contacto";
    url.searchParams.set("access", "restricted");

    return applySecurityHeaders(NextResponse.redirect(url));
  }

  const response = NextResponse.next();
  response.headers.set("x-atelier-route", pathname);

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
