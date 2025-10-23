import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";
import { PrismaQueryBuilder } from "../../../utils/QueryBuilder";

const createBlog = async (
  payload: Prisma.BlogCreateInput,
  authorId: string
) => {
  const result = await prisma.blog.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      thumbnail: payload.thumbnail,
      tags: payload.tags,
      author: {
        connect: { id: authorId }, // 🔗 connect user
      },
    },
  });
  return result;
};

export const getAllBlogs = async (query: Record<string, string>) => {
  const builder = new PrismaQueryBuilder(query)
    .filter()
    .search(["title", "slug", "content"])
    .sort()
    .paginate()
    .fields();

  const prismaArgs = builder.build();

  // Fetch data and total count in parallel
  const [data, total] = await Promise.all([
    prisma.blog.findMany({
      ...prismaArgs,
      include: { author: true },
    }),
    prisma.blog.count({ where: prismaArgs.where }),
  ]);

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const totalPage = Math.ceil(total / limit);

  return {
    meta: { page, limit, total, totalPage },
    data,
  };
};
const getBlogById = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: { id },
    include: { author: true },
  });

  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog | null> => {
  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string) => {
  const result = await prisma.blog.delete({
    where: { id },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
