import { NextRequest, NextResponse } from "next/server";
import { syncUserWithDatabase } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";

/**
 * API endpoint that syncs the current user with our database
 * This handles the automatic admin assignment to the first user
 */
export async function POST(request: NextRequest) {
  try {
    // Get the current authenticated user from Clerk
    const user = await currentUser();
    
    // If no user is authenticated, return error
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return NextResponse.json(
        { error: "No authenticated user found" },
        { status: 401 }
      );
    }
    
    // Get the user's primary email
    const primaryEmailObj = user.emailAddresses.find(
      email => email.id === user.primaryEmailAddressId
    ) || user.emailAddresses[0];
    
    const email = primaryEmailObj.emailAddress;
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    
    // Sync the user with our database (this handles first-user-as-admin logic)
    const dbUser = await syncUserWithDatabase(email, name);
    
    // Return the user data with role information
    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        isAdmin: dbUser.role === 'admin'
      }
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user data" },
      { status: 500 }
    );
  }
}