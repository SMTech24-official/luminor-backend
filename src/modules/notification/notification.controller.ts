import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { INotification } from "./notification.interface";

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = req.body;

  const result = await NotificationService.createNotification(notification);

  sendResponse<INotification>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "Notification saved    successfully",
    data: result,
  });
});
const getUserNotification = catchAsync(async (req: Request, res: Response) => {
  const { recipient, status, type } = req.query;

  const messages = await NotificationService.getUserNotification(
    recipient as string,
    status as string,
    type as string
  );

  sendResponse<INotification[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "user notification  get   successfully",
    data: messages,
  });
});
const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const messages = await NotificationService.updateNotification(id);

  sendResponse<INotification>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "user notification  update    successfully",
    data: messages,
  });
});
export const NotificationController = {
  createNotification,
  getUserNotification,
  updateNotification,
};