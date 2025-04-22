"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

/**
 * Custom hook to check if the current user has admin privileges
 * @returns Object containing admin status and loading state
 */
export function useAdmin() {
  const { isSignedIn, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!isLoaded || !isSignedIn) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/check-admin");
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          console.error("Failed to check admin status");
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
  }, [isLoaded, isSignedIn]);

  return { isAdmin, isLoading };
}