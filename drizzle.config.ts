import type { Config } from "drizzle-kit"
import "dotenv/config"

if (!process.env.DATABASE_URL && !(process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE && process.env.PGPASSWORD)) {
  throw new Error("No database credentials found in environment variables. Please add them to your .env file.")
}

export default {
  schema: "./lib/db.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.PGHOST || "",
    user: process.env.PGUSER || "",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "",
    ssl: "require",
  },
  strict: true,
  dialect: "postgresql"
} satisfies Config
