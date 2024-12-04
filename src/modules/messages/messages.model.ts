import { Schema, model } from "mongoose";
import { IMessage } from "./messages.interface";

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
      required: true,
    },

    recipient: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

export const Message = model("Message", messageSchema);