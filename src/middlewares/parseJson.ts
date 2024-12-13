import { Request, Response, NextFunction } from "express";

export const parseBodyData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.data) {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Invalid JSON format in bodyData",
      });
      return; // Ensure the response cycle ends here
    }
  }
  next(); // Proceed to the next middleware
};
