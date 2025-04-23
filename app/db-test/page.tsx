"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RunMigrationButton } from "./run-migration-button"
import { testDatabaseConnection } from "@/app/actions/database"

export default function DbTestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)
  const { toast } = useToast()

  const testConnection = async () => {
    setStatus("loading")
    try {
      // Use server action instead of fetch API
      const data = await testDatabaseConnection()

      if (!data.success) {
        throw new Error(data.message || "Failed to connect to the database")
      }

      setResult(data)
      toast({
        title: "Success!",
        description: "Successfully connected to the database.",
      })
      setStatus("success")
    } catch (error: any) {
      setStatus("error")
      toast({
        title: "Error!",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-12 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>Test the connection to your Neon Postgres database.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to test the database connection.</p>

          {status === "success" && result && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
              <h3 className="font-medium text-green-800 dark:text-green-300">Connection Successful</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Server time: {new Date(result.timestamp).toLocaleString()}
              </p>
              <div className="mt-2 text-sm">
                <p>Subscribers: {result.counts.subscribers}</p>
                <p>Blog Posts: {result.counts.blogposts}</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
              <h3 className="font-medium text-red-800 dark:text-red-300">Connection Failed</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Please check your database credentials and try again.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={testConnection} className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Testing..." : "Test Connection"}
          </Button>

          <RunMigrationButton />
        </CardFooter>
      </Card>
    </div>
  )
}
