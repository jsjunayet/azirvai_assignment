import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { ProjectService } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const ownerId = req.owner.id;
    const result = await ProjectService.createProject(req.body, ownerId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProject();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Project retrieve by successfully",
    data: result.data,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project by ID retrieval successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.updateProject(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project by ID updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project by ID deleted successfully",
    data: result,
  });
});

// const projectSoftDelete = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await (id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Patient soft deleted successfully",
//     data: result,
//   });
// });

export const ProjectController = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
