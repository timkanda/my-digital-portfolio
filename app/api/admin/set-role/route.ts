import { NextRequest, NextResponse } from "next/server";
import { db, subscribers } from "@/lib/db";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth";

/**
 * API endpoint to set a user's role
 * Protected by middleware - only accessible to admins
 */
export async function POST(request: NextRequest) {
  try {
    // First check if the current user is an admin
    const userIsAdmin = await isAdmin();
    
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin privileges required" },
        { status: 403 }
      );
    }
    
    // Get email and role from request body
    const { email, role } = await request.json();
    
    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }
    
    if (role !== 'admin' && role !== 'user') {
      return NextResponse.json(
        { error: "Role must be 'admin' or 'user'" },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Update user role
    await db
      .update(subscribers)
      .set({ role })
      .where(eq(subscribers.email, email));
    
    return NextResponse.json({ success: true, message: `User role updated to ${role}` });
  } catch (error) {
    console.error("Error setting user role:", error);
    return NextResponse.json(
      { error: "Failed to set user role" },
      { status: 500 }
    );
  }
}