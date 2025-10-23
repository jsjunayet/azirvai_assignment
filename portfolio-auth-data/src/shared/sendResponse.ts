import { Response } from "express";

interface IResponseMeta {
  page: number;
  limit: number;
  total: number;
}

export const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | null | undefined;
    meta?: IResponseMeta;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};
