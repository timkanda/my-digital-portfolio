"use server";

import { ensureTablesExist } from "@/lib/db-init";

/**
 * Server action to run database migrations
 * Replaces the POST /api/run-migration endpoint
 */
export async function runDatabaseMigration() {
  try {
    // Run the database migration
    await ensureTablesExist();

    return {
      success: true,
      message: "Database tables initialized successfully",
    };
  } catch (error) {
    console.error("Error running database migration:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to run migration",
    };
  }
}