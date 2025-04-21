"use client"

import { useState } from "react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        // Reset the form
        const form = document.getElementById("newsletter-form") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="newsletter-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input type="text" name="name" placeholder="Your name (optional)" className="bg-background" />
        <div className="flex space-x-2">
          <Input type="email" name="email" placeholder="Your email address" required className="bg-background" />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        By subscribing, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-2">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}
