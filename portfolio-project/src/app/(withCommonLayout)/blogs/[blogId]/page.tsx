import { getBlogById } from "@/components/actions/blog/BlogById";
import BlogDetailsCard from "@/components/pages/blogs/BlogDetailsCard";
import { TBlog } from "@/type/BlogType";

export const generateStaticParams = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/blog`);
  const { data: blogs } = await res.json();

  return blogs.slice(0, 2).map((blog: TBlog) => ({
    blogId: String(blog.id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  return {
    title: blog?.title,
    description: blog?.content,
  };
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const blog = await getBlogById(blogId);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
