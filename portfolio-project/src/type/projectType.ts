import { TUser } from "./BlogType";

export type TProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  liveLink?: string | null;
  githubLink?: string | null;
  features?: string[];
  createdAt?: string; // or Date, depending on how your API returns it
  updatedAt?: string;
  ownerId: string;
  owner?: TUser;
};
