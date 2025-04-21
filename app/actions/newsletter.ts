"use server"

import { db, subscribers } from "@/lib/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { ensureTablesExist } from "@/lib/db-init"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string
  const name = formData.get("name") as string

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    }
  }

  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    // Check if email already exists
    const existingSubscriber = await db.select().from(subscribers).where(eq(subscribers.email, email))

    if (existingSubscriber.length > 0) {
      return {
        success: false,
        message: "You are already subscribed to our newsletter",
      }
    }

    // Insert new subscriber
    await db.insert(subscribers).values({
      email,
      name: name || null,
    })

    revalidatePath("/")

    return {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return {
      success: false,
      message: "An error occurred while subscribing. Please try again.",
    }
  }
}

export async function getSubscribers() {
  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    const allSubscribers = await db.select().from(subscribers).orderBy(subscribers.createdAt)
    return allSubscribers
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return []
  }
}
