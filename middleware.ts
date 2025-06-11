import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/admin','/resources(.*)', '/projects']);

export default clerkMiddleware(async (auth, req) => {
  try {
    if (isProtectedRoute(req)) await auth.protect();
  } catch (error) {
    console.error("Middleware crash:", error);
    return NextResponse.next(); // Prevent 500 error from crashing deployment
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
