// Blog types
export interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  data: Blog[];
}

// Project types
export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  liveLink?: string;
  githubLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  data: Project[];
}

// Experience types
export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}

// Auth types
export interface UserData {
  email: string;
  password: string;
}

export interface DashboardOverview {
  totalProjects: number;
  totalBlogs: number;
  recentProjects: Project[];
  recentBlogs: Blog[];
}