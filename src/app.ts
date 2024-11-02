import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import cookieParser from "cookie-parser";
import { routes } from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
import httpStatus from "http-status";
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.use(globalErrorHandler);
//global error handler

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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
