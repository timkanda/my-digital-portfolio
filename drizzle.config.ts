import type { Config } from "drizzle-kit"
import "dotenv/config"

// Determine the database connection string
let connectionString: string

// If DATABASE_URL is provided, use it directly
if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL
}
// Otherwise, construct from individual PG* variables
else if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE && process.env.PGPASSWORD) {
  connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`
}
// Fallback (should not happen if environment variables are properly set)
else {
  console.warn("No database credentials found in environment variables. Using fallback connection string.")
  connectionString =
    "postgres://neondb_owner:npg_URfVtv9J5EoN@ep-summer-cell-a7bsfum3-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"
}

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.ACCOUNT_ID || "defaultAccountId",
    databaseId: process.env.DATABASE_ID || "defaultDatabaseId",
    token: process.env.TOKEN || "defaultToken",
  },
  strict: true,
  dialect: "sqlite"
} satisfies Config
