import { db, subscribers } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

/**
 * Checks if the current user is an admin using the user's email from Clerk
 * Safe to use in routes and pages
 * @returns Boolean indicating if the current user has admin privileges
 */
export async function isAdmin(): Promise<boolean> {
  try {
    // Use currentUser() which is safe in route handlers and pages
    const user = await currentUser();
    
    // If no user is logged in, they can't be an admin
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return false;
    }
    
    // Get primary email
    const primaryEmailObj = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId) 
      || user.emailAddresses[0];
    
    const email = primaryEmailObj.emailAddress;
    
    // Query the database to find the user record by email and check role
    const userResults = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    // If user exists and is admin, return true
    return userResults.length > 0 && userResults[0].role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Gets the current user from the database based on Clerk user
 * Safe to use in routes and pages
 * @returns User object with role information
 */
export async function getCurrentUser() {
  try {
    // Use currentUser() which is safe in route handlers and pages
    const user = await currentUser();
    
    // If no user is logged in, return null
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return null;
    }
    
    // Get primary email
    const primaryEmailObj = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId) 
      || user.emailAddresses[0];
    
    const email = primaryEmailObj.emailAddress;
    
    // Query the database to find the user record by email
    const userResults = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    // Return the user record or null if not found
    return userResults.length > 0 ? userResults[0] : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Creates or updates the user record in the database based on email
 * Can be used in API routes or server components safely
 * @param email User email
 * @param name User name (optional)
 */
export async function syncUserWithDatabase(email: string, name: string = ''): Promise<any> {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    // If user already exists, return the existing user
    if (existingUser.length > 0) {
      return existingUser[0];
    }
    
    // Check if this is the first user in the system
    const totalUsers = await db
      .select({ count: sql`count(*)` })
      .from(subscribers);
    
    const isFirstUser = totalUsers[0]?.count === '0';
    
    // Insert the new user with appropriate role
    await db.insert(subscribers).values({
      email,
      name,
      role: isFirstUser ? 'admin' : 'user'
    });
    
    // Get the newly created user
    const newUserResults = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    return newUserResults[0];
  } catch (error) {
    console.error("Error syncing user with database:", error);
    return null;
  }
}