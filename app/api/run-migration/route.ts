import { NextResponse } from "next/server"
import { ensureTablesExist } from "@/lib/db-init"

export async function POST() {
  try {
    // Use the ensureTablesExist function to create tables and insert sample data
    const result = await ensureTablesExist()

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Migration completed successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Migration failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Migration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Migration failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
