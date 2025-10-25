"use client";

import {
  createBlog,
  deleteBlog,
  getAllBlog,
  UpdateBlog,
} from "@/components/actions/blog";
// import { createBlog, deleteBlog, getBlogs, updateBlog } from "@/actions/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/types";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().max(300, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Invalid URL").optional().or(z.literal("")),
  tags: z.string().optional(),
});

export default function BlogManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState<any>({ data: [] });
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
    tags: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Load blogs
  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await getAllBlog();
        setBlogs(res);
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",

      content: "",
      thumbnail: "",
      tags: "",
    });
    setEditingBlog(null);
    setErrors({});
  };

  // ✅ Image upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Azir-uploads"); // 🔁 replace with your Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dft2gbhxw/image/upload", // 🔁 replace with your cloud name
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();
      if (uploaded.secure_url) {
        setFormData({ ...formData, thumbnail: uploaded.secure_url });
        toast.success("Image uploaded successfully");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle Submit (Fixed)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      blogSchema.parse(formData);
      setErrors({});
      setLoading(true);

      // ✅ Convert tags to array before sending
      const formattedData = {
        ...formData,
        tags:
          formData.tags && formData.tags.trim() !== ""
            ? formData.tags.split(",").map((t) => t.trim())
            : [],
      };

      // ✅ Add logged-in user’s ID (if available)
      // Replace with your actual user context or token decode logic
      const currentUserId = "USER_ID_HERE"; // dynamically replace this
      const payload = { ...formattedData, authorId: currentUserId };

      if (editingBlog) {
        const res = await UpdateBlog(payload, editingBlog.id);
        console.log(res);
        toast.success("Blog updated successfully");
      } else {
        await createBlog(payload);
        toast.success("Blog created successfully");
      }

      // ✅ Refresh blog list
      const refreshed = await getAllBlog();
      setBlogs(refreshed);
      setIsOpen(false);
      resetForm();
    } catch (error) {
      const typedError = error as ApiError;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      thumbnail: blog.thumbnail || "",
      tags: blog.tags?.join(", ") || "",
    });
    setIsOpen(true);
  };

  // ✅ Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      getAllBlog().then((res) => setBlogs(res));
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
              <DialogDescription>
                {editingBlog
                  ? "Update your blog post"
                  : "Fill in the details to create a new blog post"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={errors.title ? "border-destructive" : ""}
                  placeholder="Post Title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div>
                <Label>Slug *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-"),
                    })
                  }
                  placeholder="my-blog-post"
                  className={errors.slug ? "border-destructive" : ""}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug}</p>
                )}
              </div>

              <div>
                <Label>Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  placeholder="Your blog content..."
                />
              </div>

              {/* ✅ Image Upload */}
              <div>
                <Label>Thumbnail Image</Label>
                {formData.thumbnail && (
                  <Image
                    width={128}
                    height={128}
                    src={formData.thumbnail}
                    alt="Thumbnail Preview"
                    className="w-32 h-32 object-cover rounded-md mb-2 border"
                  />
                )}
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  )}
                </div>
              </div>

              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingBlog ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ✅ Blog list */}
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : blogs?.data?.length > 0 ? (
        <div className="grid gap-4">
          {blogs?.data?.map((blog: any) => (
            <Card key={blog.id} className="glass-effect hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {blog.excerpt || "No excerpt"}
                    </CardDescription>
                    {blog?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog?.tags?.map((tag: string) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-effect text-center p-12">
          <CardContent>
            <p className="text-muted-foreground">
              No blogs yet. Create your first one!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
