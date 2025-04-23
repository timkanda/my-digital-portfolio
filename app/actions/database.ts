"use server";

import { db, subscribers, blogPosts } from "@/lib/db";
import { sql } from "drizzle-orm";
import { ensureTablesExist } from "@/lib/db-init";

/**
 * Server action to test the database connection
 * Replaces the GET /api/test-db endpoint
 */
export async function testDatabaseConnection() {
  try {
    // Ensure database tables exist before querying
    await ensureTablesExist();

    // Test the database connection
    const result = await db.execute(sql`SELECT NOW()`);

    // Get counts from both tables
    const subscriberCount = await db.select({ count: sql`COUNT(*)` }).from(subscribers);
    const blogPostCount = await db.select({ count: sql`COUNT(*)` }).from(blogPosts);

    return {
      success: true,
      message: "Database connection successful",
      timestamp: result.rows[0].now,
      counts: {
        subscribers: subscriberCount[0].count,
        blogPosts: blogPostCount[0].count,
      },
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}