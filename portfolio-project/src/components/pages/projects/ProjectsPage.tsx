"use client";
import { getProjects } from "@/components/actions/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectsResponse } from "@/types";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectsResponse>({ data: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      setProjects(res);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div id="projects" className="">
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A collection of my recent work and side projects
            </p>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-effect">
                  <CardHeader>
                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects && projects?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.data?.map((project: any, index: any) => (
                <Card
                  key={project.id}
                  className="glass-effect hover-lift overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        width={400}
                        height={400}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="gradient-text">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: any) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                    {project.features && project.features.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          Key Features:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {project?.features
                            .slice(0, 3)
                            .map((feature: any, i: any) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {project.liveLink && (
                        <Button asChild size="sm" className="flex-1">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-effect text-center p-12">
              <CardContent>
                <p className="text-xl text-muted-foreground">
                  No projects yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
