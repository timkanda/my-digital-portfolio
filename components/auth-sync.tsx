"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

/**
 * AuthSync component
 * Syncs the current user with our database when they login
 * This ensures the first user becomes an admin automatically
 */
export function AuthSync() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    // Only run if auth is loaded and user is signed in
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    // Sync user data with our database through API
    const syncUser = async () => {
      try {
        const response = await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to sync user data");
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    // Call sync when component mounts and user is signed in
    syncUser();
  }, [isLoaded, isSignedIn, user]);

  // This is a background component, it doesn't render anything
  return null;
}