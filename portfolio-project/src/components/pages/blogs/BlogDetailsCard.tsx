"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetailsCard = ({ blog }: { blog: any }) => {
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="pt-24 pb-16 flex-grow">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-semibold mb-4">Blog post not found</h1>
            <Link
              href="/blogs"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-blue-600 hover:underline mb-8 block animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Thumbnail */}
        {blog.thumbnail ? (
          <div className="relative h-96 rounded-lg overflow-hidden mb-8 animate-fade-in">
            <Image
              width={800}
              height={400}
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
          </div>
        ) : (
          <Skeleton className="h-96 w-full mb-8 rounded-lg" />
        )}

        {/* Meta Info */}
        <div className="mb-8 animate-scale-in">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {format(
                  new Date(blog.createdAt || blog.created_at),
                  "MMMM d, yyyy"
                )}
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag: any) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div
          className="prose dark:prose-invert max-w-none prose-img:rounded-lg animate-fade-in"
          style={{ animationDelay: "200ms" }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
};

export default BlogDetailsCard;
