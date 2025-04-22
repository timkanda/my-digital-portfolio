/**
 * Script to promote a user to admin role
 * This is useful for setting up the first admin user
 * 
 * Usage:
 * Run this script with the user's email as an argument:
 * npx ts-node scripts/promote-admin.ts user@example.com
 */

import { db, subscribers } from "@/lib/db";
import { eq } from "drizzle-orm";

async function promoteToAdmin(email: string) {
  try {
    // Check if user exists
    const existingUser = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    
    if (existingUser.length === 0) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }
    
    // Update user role to admin
    await db
      .update(subscribers)
      .set({ role: 'admin' })
      .where(eq(subscribers.email, email));
    
    console.log(`Successfully promoted ${email} to admin role`);
    process.exit(0);
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address");
  console.error("Usage: npx ts-node scripts/promote-admin.ts user@example.com");
  process.exit(1);
}

promoteToAdmin(email);