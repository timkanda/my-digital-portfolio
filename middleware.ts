import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(['/admin','/resources(.*)', '/projects']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})


// Define admin-only routes
// const isAdminRoute = createRouteMatcher(['/admin']);

// export default clerkMiddleware(async (auth, req) => {
//   try {
//     // User synchronization happens in an API route after authentication
//     // No need to sync in middleware
    
//     // For regular protected routes, just ensure user is authenticated
//     if (isProtectedRoute(req)) {
//       await auth.protect();
//       return;
//     }
    
//     // For admin routes, check both authentication and admin role
//     if (isAdminRoute(req)) {
//       try {
//         // First ensure they're logged in
//         await auth.protect();
        
//         // Allow authenticated users to proceed - role check will be done in the page
//         // This bypasses the issue with currentUser() not working in middleware
//         return;
//       } catch (error) {
//         // If not authenticated, redirect to auth page
//         return NextResponse.redirect(new URL('/', req.url));
//       }
//     }
//   } catch (error) {
//     console.error("Middleware error:", error);
    
//     // If there's a critical error in protected routes, redirect to auth page
//     if (isProtectedRoute(req) || isAdminRoute(req)) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }
  
//   // For all other routes, continue normally
//   return;
// });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};