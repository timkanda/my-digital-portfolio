"use server";

import { db, projects } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Type for project creation
export type ProjectCreateInput = {
  title: string;
  description: string;
  icon: string;
  items: string[];
};

/**
 * Server action to fetch all projects
 * Replaces the GET /api/projects endpoint
 */
export async function getProjects() {
  try {
    // Fetch all projects from the database
    const allProjects = await db.select().from(projects).orderBy(asc(projects.id));

    return {
      success: true,
      projects: allProjects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
    };
  }
}

/**
 * Server action to create a new project
 * Replaces the POST /api/projects endpoint
 */
export async function createProject(data: ProjectCreateInput) {
  try {
    // Check if the user is an admin
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    
    // Validate required fields
    if (!data.title || !data.description || !data.icon || !data.items || !Array.isArray(data.items)) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }
    
    // Insert the new project into the database
    const newProject = await db.insert(projects).values({
      title: data.title,
      description: data.description,
      icon: data.icon,
      items: data.items,
    }).returning();
    
    // Revalidate projects page to show the new project
    revalidatePath('/projects');
    
    return {
      success: true,
      project: newProject[0],
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: "Failed to create project",
    };
  }
}