import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import fs from "fs";
import config from "../config";

// Configure DigitalOcean Spaces
const s3 = new S3Client({
  region: "nyc3",
  endpoint: config.s3.do_space_endpoint,
  credentials: {
    accessKeyId: config.s3.do_space_accesskey || "", // Ensure this is never undefined
    secretAccessKey: config.s3.do_space_secret_key || "", // Ensure this is never undefined
  },
});

// Function to upload a file to DigitalOcean Space
export const uploadFileToSpace = async (
  file: any,
  folder: string
) => {
  if (!process.env.DO_SPACE_BUCKET) {
    throw new Error(
      "DO_SPACE_BUCKET is not defined in the environment variables."
    );
  }

  const params = {
    Bucket: process.env.DO_SPACE_BUCKET, // Your Space name
    Key: `${folder}/${Date.now()}_${file.originalname}`, // Object key in the Space
    Body: file.buffer, // Use the buffer from the memory storage
    ContentType: file.mimetype,
    ACL: "public-read" as ObjectCannedACL, // Make the object publicly accessible
  };
  // console.log(params, "check params");

  try {
    const result = await s3.send(new PutObjectCommand(params));
    // console.log(result,"check result")
    return `https://${config.s3.do_space_bucket}.${(
      config.s3.do_space_endpoint || "nyc3.digitaloceanspaces.com"
    ).replace("https://", "")}/${params.Key}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
