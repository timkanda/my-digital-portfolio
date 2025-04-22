import { getSubscribers } from "@/app/actions/newsletter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Users, FileText, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db, blogPosts } from "@/lib/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ensureTablesExist } from "@/lib/db-init";

export default async function AdminPage() {
  await ensureTablesExist();

  let subscribers: any[] = [];
  let posts: any[] = [];
  let dbError = false;

  try {
    subscribers = await getSubscribers();
    posts = await db
      .select()
      .from(blogPosts)
      .orderBy(blogPosts.createdAt);
  } catch (error) {
    console.error("Error fetching data:", error);
    dbError = true;
  }

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Admin Dashboard
              </h1>
              <div className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Manage your subscribers and blog posts.
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          {dbError ? (
            <div>
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Database Error</AlertTitle>
                <AlertDescription>
                  There was an error connecting to the database. Please try
                  refreshing the page or contact support if the issue persists.
                </AlertDescription>
              </Alert>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  Refresh Page
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 mb-12">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Subscribers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscribers.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total newsletter subscribers
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Blog Posts
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{posts.length}</div>
                    <div className="text-xs text-muted-foreground">
                      Published blog posts
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="subscribers">
                <TabsList className="mb-8">
                  <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                  <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="subscribers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Newsletter Subscribers</CardTitle>
                      <CardDescription>
                        Manage your newsletter subscribers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {subscribers.length === 0 ? (
                        <div className="text-center py-6">
                          <div className="text-muted-foreground">
                            No subscribers yet.
                          </div>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Email</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Date Subscribed</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subscribers.map((subscriber) => (
                              <TableRow key={subscriber.id}>
                                <TableCell>{subscriber.email}</TableCell>
                                <TableCell>{subscriber.name || "—"}</TableCell>
                                <TableCell>
                                  {formatDate(subscriber.createdAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="blog-posts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blog Posts</CardTitle>
                      <CardDescription>
                        Manage your blog content.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {posts.length === 0 ? (
                        <div className="text-center py-6">
                          <div className="text-muted-foreground">
                            No blog posts yet.
                          </div>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Slug</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Date Published</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {posts.map((post) => (
                              <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.slug}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>
                                  {formatDate(post.createdAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
