import { IMessage } from "./messages.interface";
import { Message } from "./messages.model";

const createMessage = async (payload: IMessage) => {
  const result = await Message.create(payload);
  return result;
};
const getMessages = async (senderId: string, recipientId: string) => {
  const messages = await Message.find({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  }).sort({ createdAt: 1 });

  return messages;
};

export const MessageService = {
  createMessage,
  getMessages,
};