import multer from "multer";

const multerUpload = multer({
  storage: multer.memoryStorage(), // Store file in memory (buffer)
  limits: {
    fileSize: 50 * 1024 * 1024, // Optional: limit file size (50MB in this example)
  },
});

export { multerUpload };
