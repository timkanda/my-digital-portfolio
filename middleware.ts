import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For now, we'll just return the request as is
  // We'll implement proper authentication later
  return NextResponse.next()
}

export const config = {
  // Only run the middleware on admin routes
  matcher: ["/admin/:path*"],
}
