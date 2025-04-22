import { NextResponse } from "next/server";
import { db, subscribers } from "@/lib/db";
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
    // This ensures the first user (who is automatically an admin) is identified
    const users = await db
      .select()
      .from(subscribers)
      .orderBy(subscribers.createdAt);
    
    // Add a flag for the first user
    const usersWithFlags = users.map((user, index) => ({
      ...user,
      isFirstUser: index === 0
    }));
    
    return NextResponse.json(usersWithFlags);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}