import { z } from "zod";

const CreateMessageSchema = z.object({
  body: z.object({
    recipient: z.string({
      required_error: "recipient is Required",
    }),

    sender: z.string({
      required_error: "sender number is Required",
    }),
    message: z.string({
      required_error: "message is Required",
    }),
  }),
});

export const MessageValidation = {
  CreateMessageSchema,
};