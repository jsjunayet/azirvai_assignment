import { getAllBlog } from "@/components/actions/blog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ISR every 60 seconds
export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getAllBlog();

  return (
    <div id="blog" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        {blogs?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.data.map((blog: any) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`}>
                <Card className="hover-lift overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-[1.02]">
                  {blog.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        width={400}
                        height={400}
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDistanceToNow(new Date(blog.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <CardTitle className="group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>

                    {blog.excerpt && (
                      <CardDescription className="line-clamp-3 mt-2">
                        {blog.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>

                  {blog.tags && blog.tags.length > 0 && (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
