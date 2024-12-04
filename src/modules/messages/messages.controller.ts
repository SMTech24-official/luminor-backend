import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IMessage } from "./messages.interface";
import { MessageService } from "./messages.service";
import { Request, Response } from "express";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const createMessage = req.body;

  const result = await MessageService.createMessage(createMessage);

  sendResponse<IMessage>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "Message create   successfully",
    data: result,
  });
});
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { user1, user2} = req.query;

  const messages = await MessageService.getMessages(
    user1 as string,
    user2 as string
  );

  sendResponse<IMessage[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "Message get   successfully",
    data: messages,
  });
});
export const MessageController = {
  createMessage,
  getMessages,
};