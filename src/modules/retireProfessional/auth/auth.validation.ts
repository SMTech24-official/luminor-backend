import { z } from "zod";

const retireProfessionalAuthSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: "First name is required",
        }),

      lastName: z
        .string({
          required_error: "Last name is required",
        })
       
    }),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),

    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      }),
     

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
      .array(z.string())
      .optional(), // Optional field for previous positions

    // References field as an array of objects with a name and email
    references: z
      .array(
        z.object({
          name: z.string(),
          email: z
            .string()
            .email("Invalid email format for reference")
          
        })
      )
      .optional(), // Optional field for references

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
