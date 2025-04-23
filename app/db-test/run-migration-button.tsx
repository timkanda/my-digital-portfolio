"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Database } from "lucide-react"
import { runDatabaseMigration } from "@/app/actions/migration"

export function RunMigrationButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const runMigration = async () => {
    setStatus("loading")
    setError(null)

    try {
      // Use server action instead of fetch API
      const result = await runDatabaseMigration()

      if (result.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setError(result.message || "Unknown error")
      }
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to run migration")
    }
  }

  return (
    <div className="mt-4 space-y-4 w-full">
      <Button onClick={runMigration} className="w-full" disabled={status === "loading"} variant="outline">
        <Database className="mr-2 h-4 w-4" />
        {status === "loading" ? "Running Migration..." : "Initialize Database Tables"}
      </Button>

      {status === "success" && (
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
            <h3 className="font-medium text-green-800 dark:text-green-300">Migration Successful</h3>
          </div>
          <div className="mt-2 text-sm text-green-700 dark:text-green-300">
            <p>Database tables have been initialized successfully.</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <h3 className="font-medium text-red-800 dark:text-red-300">Migration Failed</h3>
          </div>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
