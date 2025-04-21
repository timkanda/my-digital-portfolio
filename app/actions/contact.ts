"use server"

import { db, contactSubmissions } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { sql } from "drizzle-orm"
import { ensureTablesExist } from "@/lib/db-init"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill out all required fields.",
    }
  }

  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    await db.insert(contactSubmissions).values({
      name,
      email,
      company: company || null,
      message,
    })

    revalidatePath("/contact")

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "An error occurred while submitting your message. Please try again.",
    }
  }
}

export async function getContactSubmissions() {
  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    const submissions = await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt, "desc")
    return submissions
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return []
  }
}

export async function markSubmissionAsRead(id: number) {
  try {
    // Ensure database tables exist before querying
    await ensureTablesExist()

    await db.update(contactSubmissions).set({ isRead: "true" }).where(sql`${contactSubmissions.id} = ${id}`)

    revalidatePath("/admin")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error marking submission as read:", error)
    return {
      success: false,
    }
  }
}
