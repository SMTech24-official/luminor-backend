import { NextFunction, Request, Response } from "express";

export const parseBodyData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data); // Parse the nested JSON
    }
    next(); // Proceed to the next middleware
  } catch (error:any) {
    console.error("Error parsing JSON:", error.message);
    res.status(400).json({
      success: false,
      message: "Invalid JSON format in body data",
    });
  }
};
