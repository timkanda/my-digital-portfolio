"use server";

import { isAdmin, getCurrentUser } from "@/lib/auth";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";

/**
 * Server action to check if the current user has admin privileges
 * Replaces the GET /api/check-admin endpoint
 */
export async function checkAdminStatus() {
  try {
    const userIsAdmin = await isAdmin();
    return { isAdmin: userIsAdmin };
  } catch (error) {
    console.error("Error checking admin status:", error);
    return { 
      isAdmin: false,
      error: "Failed to check admin status" 
    };
  }
}

/**
 * Server action to get the current user with role information
 */
export async function getUser() {
  try {
    const user = await getCurrentUser();
    return { 
      user,
      isAuthenticated: !!user
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return { 
      user: null,
      isAuthenticated: false,
      error: "Failed to get user information"
    };
  }
}

/**
 * Server action to get all users with their roles
 * Replaces the GET /api/admin/get-users endpoint
 * Only accessible to admins
 */
export async function getUsers() {
  try {
    // First check if the current user is an admin
    const userIsAdmin = await isAdmin();
    
    if (!userIsAdmin) {
      return { 
        success: false,
        error: "Unauthorized. Admin privileges required" 
      };
    }
    
    // Get all users ordered by creation date
    const usersList = await db
      .select()
      .from(users)
      .orderBy(users.createdAt);
    
    return {
      success: true,
      users: usersList
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: "Failed to fetch users"
    };
  }
}

/**
 * Server action to set a user's role
 * Replaces the POST /api/admin/set-role endpoint
 * Only accessible to admins
 */
export async function setUserRole(email: string, role: 'admin' | 'user') {
  try {
    // First check if the current user is an admin
    const userIsAdmin = await isAdmin();
    
    if (!userIsAdmin) {
      return {
        success: false,
        error: "Unauthorized. Admin privileges required"
      };
    }
    
    if (!email || !role) {
      return {
        success: false,
        error: "Email and role are required"
      };
    }
    
    if (role !== 'admin' && role !== 'user') {
      return {
        success: false,
        error: "Role must be 'admin' or 'user'"
      };
    }
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (existingUser.length === 0) {
      return {
        success: false,
        error: "User not found"
      };
    }
    
    // Update user role
    await db
      .update(users)
      .set({ role })
      .where(eq(users.email, email));
    
    return { 
      success: true, 
      message: `User role updated to ${role}` 
    };
  } catch (error) {
    console.error("Error setting user role:", error);
    return {
      success: false,
      error: "Failed to set user role"
    };
  }
}