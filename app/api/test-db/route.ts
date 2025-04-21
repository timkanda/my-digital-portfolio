import { NextResponse } from "next/server"
import { db, subscribers, blogPosts } from "@/lib/db"
import { sql } from "drizzle-orm"
import { ensureTablesExist } from "@/lib/db-init"

export async function GET() {
  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    // Test the database connection
    const result = await db.execute(sql`SELECT NOW()`)

    // Get counts from both tables
    const subscriberCount = await db.select({ count: sql`COUNT(*)` }).from(subscribers)
    const blogPostCount = await db.select({ count: sql`COUNT(*)` }).from(blogPosts)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      timestamp: result.rows[0].now,
      counts: {
        subscribers: subscriberCount[0].count,
        blogPosts: blogPostCount[0].count,
      },
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
