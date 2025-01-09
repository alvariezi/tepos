import { NextResponse } from "next/server";

export function middleware(request) {
  const apiKey = request.headers.get("x-api-key");
  const apiRoutes = ["/api/product", "/api/product/:id", "/api/product/:id/:idProduct"];
  const token = request.cookies.get("token");
  const restrictedPaths = ["/product", "/cashier", "/history", "/settings"];

  if (apiRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });
    }
  }

  if (
    !token &&
    restrictedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/product", "/api/product/:id", "/api/product/:id/:idProduct", "/product", "/cashier", "/history", "/settings",
  ],
};