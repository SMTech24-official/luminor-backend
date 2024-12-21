"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const messages_model_1 = require("./modules/messages/messages.model");
const notification_model_1 = require("./modules/notification/notification.model");
const notificationStatus_1 = require("./enums/notificationStatus");
const options = {
    autoIndex: true,
};
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: `${config_1.default.front_end_url}`,
    },
    transports: ["polling", "websocket"],
    pingInterval: 25000,
    pingTimeout: 60000,
    upgradeTimeout: 30000,
});
// Store socket IDs for users
const users = {};
io.on("connection", (socket) => {
    // Register the user with their email and socket ID
    socket.on("register", (email) => {
        users[email] = socket.id;
    });
    // Private messaging between users
    socket.on("privateMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ toEmail, message, timestamp }) {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        if (!senderEmail) {
            return;
        }
        try {
            const savedMessage = yield messages_model_1.Message.create({
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
        }
        catch (error) { }
    }));
    // Notification event
    socket.on("notification", (_a) => __awaiter(void 0, [_a], void 0, function* ({ toEmail, message, timestamp, _id, type }) {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        if (!senderEmail) {
            return;
        }
        try {
            const notification = yield notification_model_1.Notification.create({
                recipient: toEmail,
                sender: senderEmail,
                message: message,
                status: notificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                type: type,
            });
            const notificationData = notification.toObject();
            const notificationResponse = {
                success: true,
                statusCode: 200,
                message: "Notification saved successfully",
                data: notificationData,
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
        }
        catch (error) {
            socket.emit("notificationError", "Failed to create notification");
        }
    }));
    // WebRTC Signaling: Handling offer, answer, and ICE candidates
    socket.on("sendOffer", (offer, toEmail) => {
        const toSocketId = users[toEmail];
        if (toSocketId) {
            socket.to(toSocketId).emit("receiveOffer", offer, socket.id);
        }
    });
    socket.on("sendAnswer", (answer, toSocketId) => {
        socket.to(toSocketId).emit("receiveAnswer", answer);
    });
    socket.on("sendCandidate", (candidate, toSocketId) => {
        socket.to(toSocketId).emit("receiveCandidate", candidate);
    });
    // Handle disconnection of users
    socket.on("disconnect", (reason) => {
        for (const email in users) {
            if (users[email] === socket.id) {
                delete users[email];
                break;
            }
        }
    });
    socket.on("error", (error) => { });
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect("mongodb+srv://luminor:BYcHOYLQI2eiZ9IU@cluster0.v0ciw.mongodb.net/luminor?retryWrites=true&w=majority&appName=Cluster0", options);
            console.log(config_1.default.database_url, "check data base url");
            console.log("Connected to MongoDB successfully.");
            // Start the server
            httpServer.listen(config_1.default.port, () => {
                console.log(`Server running at port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1);
        }
    });
}
bootstrap();
