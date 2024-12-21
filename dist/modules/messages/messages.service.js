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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const messages_model_1 = require("./messages.model");
const createMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield messages_model_1.Message.create(payload);
    return result;
});
const getMessages = (senderId, recipientId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messages_model_1.Message.find({
        $or: [
            { sender: senderId, recipient: recipientId },
            { sender: recipientId, recipient: senderId },
        ],
    }).sort({ createdAt: 1 });
    return messages;
});
exports.MessageService = {
    createMessage,
    getMessages,
};
