import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
//import { NewsletterForm } from "@/components/newsletter-form"

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blog-posts?where[slug][equals]=${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Error: ${res.statusText}`);

    const data = await res.json();
    return { post: data.docs?.[0] || null, error: null };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { post: null, error };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post, error } = await getBlogPost(params.slug);

  if (error) {
    return (
      <div className="flex flex-col">
        <div className="container px-4 md:px-6 py-12">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <Alert variant="destructive" className="mb-8">
            <AlertTitle>API Error</AlertTitle>
            <AlertDescription>
              Failed to load the blog post. Please try again later or contact support.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-[400px] relative bg-black">
        <Image
          src={post.coverImage || "/placeholder.svg?height=600&width=1200&query=cybersecurity"}
          fill
          alt={post.title}
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container px-4 md:px-6 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto bg-background rounded-lg shadow-lg p-6 md:p-10 border border-border">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          <div
            className="mt-8 prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      <section className="w-full py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Stay updated with the latest cybersecurity insights and tips.
              </p>
            </div>
            <div className="w-full max-w-md">
            <NewsletterForm /> 
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
