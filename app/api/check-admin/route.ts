import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

/**
 * API route to check if the current user has admin privileges
 * Used by client components that need to know user role
 */
export async function GET() {
  try {
    // Check if current user has admin role
    const userIsAdmin = await isAdmin();
    
    // Return the admin status
    return NextResponse.json({ isAdmin: userIsAdmin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      { error: "Failed to check admin status" },
      { status: 500 }
    );
  }
}