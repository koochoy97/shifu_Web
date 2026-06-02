import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/events/:path*"],
};

export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("ADMIN_PASSWORD not set", { status: 500 });
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const idx = decoded.indexOf(":");
      const pass = idx >= 0 ? decoded.slice(idx + 1) : decoded;
      if (pass === expected) return NextResponse.next();
    }
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Shifu Admin"' },
  });
}
