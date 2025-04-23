"use client";

import { useState, useEffect } from "react";
import AddProjectForm from "./add-project-form";
import { useRouter } from "next/navigation";
import { checkAdminStatus } from "@/app/actions/admin";

export default function ProjectAdminSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Check admin status using the server action instead of API call
  useEffect(() => {
    async function checkIsAdmin() {
      try {
        const result = await checkAdminStatus();
        setIsAdmin(result.isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkIsAdmin();
  }, []);
  
  // Function to refresh the page when a new project is added
  const handleProjectAdded = () => {
    router.refresh();
  };
  
  // Only render for admins
  if (isLoading) {
    return <div className="container px-4 md:px-6 pt-8">Loading admin access...</div>;
  }
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="container px-4 md:px-6 pt-8">
      <AddProjectForm onProjectAdded={handleProjectAdded} />
    </div>
  );
}