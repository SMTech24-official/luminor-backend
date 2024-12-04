import mongoose from "mongoose";
import config from "./config";
import { createServer } from "http";
import app from "./app";
import { Server } from "socket.io";
import { Message } from "./modules/messages/messages.model";
import { Notification } from "./modules/notification/notification.model";
import { ENUM_NOTIFICATION_STATUS } from "./enums/notificationStatus";
import { NotificationCreateResponse } from "./modules/notification/notification.interface";

const options = {


  autoIndex: true,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `${config.front_end_url}`,
  },
  transports: ["polling", "websocket"],
  pingInterval: 25000,
  pingTimeout: 60000,
  upgradeTimeout: 30000,
});
const users: { [key: string]: string } = {};
io.on("connection", (socket) => {
  socket.on("register", (email: string) => {
    users[email] = socket.id;
  });

  socket.on("privateMessage", async ({ toEmail, message, timestamp }) => {
    const toSocketId = users[toEmail];
    const senderEmail = Object.keys(users).find(
      (key) => users[key] === socket.id
    );

    if (!senderEmail) {
      return;
    }

    try {
      // Save the message to the database regardless of recipient's connection status
      const savedMessage = await Message.create({
        sender: senderEmail,
        message: message,
        recipient: toEmail,
      });

      if (toSocketId) {
        socket.to(toSocketId).emit("privateMessage", {
          from: senderEmail,
          message,
          timestamp,
        });
      }
    } catch (error) {}
  });

  socket.on(
    "notification",
    async ({ toEmail, message, timestamp, _id, type }) => {
      const toSocketId = users[toEmail];
      const senderEmail = Object.keys(users).find(
        (key) => users[key] === socket.id
      );

      if (!senderEmail) {
        return;
      }

      try {
       const notification = await Notification.create({
  recipient: toEmail,
  sender: senderEmail,
  message: message,
  status: ENUM_NOTIFICATION_STATUS.UNSEEN,
  type: type,
});

// Use .toObject() to get a plain object
const notificationData = notification.toObject();

const notificationResponse: NotificationCreateResponse = {
  success: true,
  statusCode: 200,
  message: "Notification saved successfully",
  data: notificationData, // Plain object
};

const notificationId = notificationData._id;
if (toSocketId) {
  socket.to(toSocketId).emit("notification", {
    from: senderEmail,
    message,
    timestamp,
    _id: notificationId,
    type: type,
  });
}
      } catch (error) {
        socket.emit("notificationError", "Failed to create notification");
      }
    }
  );
  

  socket.on("disconnect", (reason) => {
    for (const email in users) {
      if (users[email] === socket.id) {
        delete users[email];
        break;
      }
    }
  });

  socket.on("error", (error) => {});
});

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
