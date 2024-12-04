import { z } from "zod";

const createNoticationSchema = z.object({
  body: z.object({
    recipient: z.string({
      required_error: "recipient is Required",
    }),

    sender: z.string({
      required_error: "sender number is Required",
    }),
    message: z.string({
      required_error: "Address is Required",
    }),

    type: z.string({
      required_error: "type is Required",
    }),
  }),
});

export const NoticationValidation = {
  createNoticationSchema,
};