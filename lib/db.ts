import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

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

// Create a SQL query executor using the Neon serverless driver
const sql = neon(connectionString)

// Create a Drizzle instance
export const db = drizzle(sql)

// Define the subscribers table schema
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define the blog posts table schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: text("author").notNull(),
  readTime: text("read_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Define the contact submissions table schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: text("is_read").default("false"),
})
