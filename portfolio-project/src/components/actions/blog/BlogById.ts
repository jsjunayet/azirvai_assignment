import { BlogWithAuthor } from "@/type/BlogType";

export const getBlogById = async (blogId: string) => {
  const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`);
  const response = await res.json();
  const blog: BlogWithAuthor = response.data;

  return blog;
};
