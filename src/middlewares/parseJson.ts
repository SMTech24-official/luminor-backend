// import { Request, Response, NextFunction } from "express";

// const isJSONString = (str: string): boolean => {
//   return (
//     (str.startsWith("{") && str.endsWith("}")) || // Check for JSON object
//     (str.startsWith("[") && str.endsWith("]"))   // Check for JSON array
//   );
// };

// export const parseNestedJSON = (req: Request, res: Response, next: NextFunction): void => {
//     console.log(req.body,"from parse nested json")
//   for (const key in req.body) {
//     if (typeof req.body[key] === "string" && isJSONString(req.body[key])) {
//       try {
//         req.body[key] = JSON.parse(req.body[key]); // Parse JSON strings
//       } catch (err: any) {
//         console.error(`Error parsing JSON for key "${key}": ${err.message}`);
//         // Retain original string value if parsing fails
//       }
//     }
//   }
//   next(); // Ensure the next middleware is called
// };
import  { Request, Response, NextFunction } from "express";

export const parseBodyData = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Your logic for parsing the body data
    if (req.body) {
      req.body = JSON.parse(req.body.data || "{}");
    }
    next(); // Explicitly call next() to pass control to the next middleware
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
