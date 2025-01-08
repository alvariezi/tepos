import { NextResponse } from "next/server";

export function middleware(req) {
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/product", "/api/product/:id", "/api/product/:id/:idProduct"],
};