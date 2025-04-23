"use client";

import { useState, useEffect } from "react";
import AddProjectForm from "./add-project-form";
import { useRouter } from "next/navigation";

export default function ProjectAdminSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Check admin status using the API instead of the useAdmin hook
  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const response = await fetch("/api/check-admin", {
          credentials: "include"
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAdminStatus();
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