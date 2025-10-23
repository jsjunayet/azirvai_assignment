import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response) => {
  try {
    const ownerId = req.owner.id;

    const result = await BlogService.createBlog(req.body, ownerId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog by ID retrieve successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id, req.body);
  const result = await BlogService.updateBlog(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog by ID Updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Blog is deleted by ID successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
