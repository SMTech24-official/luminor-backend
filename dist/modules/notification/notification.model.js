"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notfication_const_1 = require("./notfication.const");
const notificationStatus_1 = require("../../enums/notificationStatus");
const NotificationSchema = new mongoose_1.Schema({
    recipient: {
        type: String,
        required: true,
        index: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: notfication_const_1.NotificationType,
        index: true,
    },
    status: {
        type: String,
        enum: notfication_const_1.NotificationStatus,
        default: notificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.Notification = (0, mongoose_1.model)("notification", NotificationSchema);
