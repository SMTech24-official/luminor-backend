import { z } from "zod";

const authClientSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),

    dateOfBirth: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z
        .date({
          required_error: "Date of birth is required",
        })
        .refine(
          (date) => {
            const now = new Date();
            return date < now; // Ensure date of birth is in the past
          },
          { message: "Date of birth must be a past date" }
        )
    ),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long"),

    businessType: z.string({
      required_error: "Business type is required",
    }),

    companyName: z.string().optional(), // Optional field

    jobTitle: z.string({
      required_error: "Job title is required",
    }),

    linkedinProfile: z.string().url("Invalid LinkedIn profile URL").optional(), // Optional field
  }),
});

export const AuthClientValidation = {
  authClientSchema,
};
