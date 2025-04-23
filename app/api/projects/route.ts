import { db, projects } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all projects from the database
    const allProjects = await db.select().from(projects).orderBy(asc(projects.id));

    return NextResponse.json({
      success: true,
      projects: allProjects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// Add endpoint to create a new project
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Check if the user is an admin - call isAdmin() directly instead of making an API request
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    // Validate required fields
    if (!body.title || !body.description || !body.icon || !body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Insert the new project into the database
    const newProject = await db.insert(projects).values({
      title: body.title,
      description: body.description,
      icon: body.icon,
      items: body.items,
    }).returning();
    
    return NextResponse.json({
      success: true,
      project: newProject[0],
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}