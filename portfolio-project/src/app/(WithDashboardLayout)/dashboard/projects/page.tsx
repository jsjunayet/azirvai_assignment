"use client";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/components/actions/project";
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
import { ApiError, ProjectsResponse } from "@/types";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

// ✅ Validation schema (sync with backend)
const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  liveLink: z.string().optional(),
  githubLink: z.string().optional(),
  features: z.string().optional(),
  technologies: z.string().optional(),
});

export default function ProjectManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectsResponse>({ data: [] });
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
    features: "",
    technologies: "",
  });

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      image: "",
      liveLink: "",
      githubLink: "",
      features: "",
      technologies: "",
    });
    setEditingProject(null);
    setErrors({});
  };

  // ✅ Load all projects (from backend)
  useEffect(() => {
    (async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Handle edit
  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image: project.image || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      features: project.features?.join("\n") || "",
      technologies: project.technologies?.join(", ") || "",
    });
    setIsOpen(true);
  };

  // ✅ Handle Cloudinary image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Azir-uploads");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dft2gbhxw/image/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, image: result.secure_url }));
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }
  };

  // ✅ Handle form submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      const parsed = projectSchema.parse(formData);
      setErrors({});

      // Convert string inputs to arrays before sending to backend
      const payload = {
        ...parsed,
        features: parsed.features
          ? parsed.features
              .split("\n")
              .map((f) => f.trim())
              .filter(Boolean)
          : [],
        technologies: parsed.technologies
          ? parsed.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }

      const updated = await getProjects();
      setProjects(updated);
      setIsOpen(false);
      resetForm();
    } catch (error) {
      const typedError = error as ApiError;
      console.log(error);
    }
  };

  // ✅ Delete project
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      const updated = await getProjects();
      setProjects(updated);
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>

        {/* Dialog for Create / Edit */}
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Update your existing project details"
                  : "Fill the form to create a new project"}
              </DialogDescription>
            </DialogHeader>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Text Fields */}
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
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
                  placeholder="my-project"
                  className={errors.slug ? "border-destructive" : ""}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Project description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* ✅ Image Upload */}
              <div className="space-y-2">
                <Label>Project Image</Label>
                {formData.image ? (
                  <div className="flex flex-col items-start gap-2">
                    <Image
                      height={500}
                      width={500}
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, image: "" })}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border rounded-md p-2 w-full"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Live Link</Label>
                <Input
                  type="url"
                  value={formData.liveLink}
                  onChange={(e) =>
                    setFormData({ ...formData, liveLink: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>GitHub Link</Label>
                <Input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) =>
                    setFormData({ ...formData, githubLink: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : projects.data.length > 0 ? (
        <div className="grid gap-4">
          {projects?.data.map((project: any) => (
            <Card key={project.id} className="glass-effect hover-lift">
              {project.image && (
                <Image
                  height={500}
                  width={800}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>

                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
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
        <Card className="text-center p-12">
          <CardContent>
            <p className="text-muted-foreground">
              No projects yet. Create your first one!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
