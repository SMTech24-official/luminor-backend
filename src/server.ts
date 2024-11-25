import mongoose from "mongoose";
import config from "./config";
import { createServer } from "http";
import app from "./app";

const options = {


  autoIndex: true,
};

const httpServer = createServer(app);

async function bootstrap() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string, options);
    console.log(config.database_url,"check data base url")
    console.log("Connected to MongoDB successfully.");

    // Start the server
    httpServer.listen(config.port, () => {
      console.log(`Server running at port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

bootstrap();
