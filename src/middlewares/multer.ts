import { NextFunction, Request } from "express";
import multer, { Multer, FileFilterCallback } from "multer";
import ApiError from "../errors/handleApiError";

const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body,"checkz")
    cb(null, DIR);
  },
  filename: (req, file, cb) => {

   
    // console.log(req.body,"cehck body from multer")
    console.log(req.file)
  
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  try {
    // Supported file types
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword", // for .doc files
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx files
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      throw new ApiError(400, "Unsupported file format");
    }
  } catch (error: any) {
    cb(error, false); // Reject file
  }
};


export const multerUpload: Multer = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Increased limit to 5MB for documents
  fileFilter: fileFilter,
});
