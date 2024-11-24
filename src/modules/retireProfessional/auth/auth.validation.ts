import { z } from "zod";

const retireProfessionalAuthSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: "First name is required",
        })
        .min(2, "First name must be at least 2 characters long"),
      lastName: z
        .string({
          required_error: "Last name is required",
        })
        .min(2, "Last name must be at least 2 characters long"),
    }),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),

    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, "Phone number must be at least 10 characters long")
      .max(15, "Phone number cannot exceed 15 characters"),

    dateOfBirth: z
      .string({
        required_error: "Date of birth is required",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),

    industry: z
      .string({
        required_error: "Industry is required",
      })
      .min(2, "Industry must be at least 2 characters long"),

    previousPositions: z
      .array(
        z.string().min(1, "Each previous position must be a non-empty string")
      )
      .min(1, "At least one previous position is required"),

    referencenames: z.array(z.string()).optional(), // Optional field for reference names

    referenceEmail: z
      .array(z.string().email("Invalid email format"))
      .min(1, "At least one reference email is required"),

    educationalBackground: z.string().optional(), // Optional field for educational background

    technicalSkill: z
      .string({
        required_error: "Technical skill is required",
      })
      .min(2, "Technical skill must be at least 2 characters long"),

    cvOrCover: z
      .object({
        fileName: z.string().optional(),
        filePath: z.string().optional(),
        fileType: z.string().optional(),
      })
      .optional(), // Optional field for CV or Cover Letter file info
  }),
});

export const RetireProfessionalAuthValidation = {
  retireProfessionalAuthSchema,
};
