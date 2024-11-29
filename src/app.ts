import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
import {StatusCodes} from "http-status-codes";
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(globalErrorHandler);
//global error handler

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
