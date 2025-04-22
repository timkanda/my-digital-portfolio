import { NextResponse } from "next/server";
import { db, users } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { desc } from "drizzle-orm";

/**
 * API endpoint to get all users with their roles
 * Protected by middleware - only accessible to admins
 */
export async function GET() {
  try {
    // First check if the current user is an admin
    const userIsAdmin = await isAdmin();
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin privileges required" },
        { status: 403 }
      );
    }
    
    // Get all users ordered by creation date
    const usersList = await db
      .select()
      .from(users)
      .orderBy(users.createdAt);
    
    // isFirstUser field is already in the users table
    return NextResponse.json(usersList);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}