export type BlogWithAuthor = TBlog & { author: TUser };

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "USER";
  createdAt: Date;
  updatedAt: Date;
  blogs: string[];
  projects: string[];
};

export type TBlog = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  authorId?: string;
  author?: TUser;
};
