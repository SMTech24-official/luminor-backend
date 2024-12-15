import { z } from "zod";
import { ENUM_USER_ROLE } from "../../enums/user";

const signUpZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is Required",
      }),
      lastName: z.string({
        required_error: "Last Name is Required",
      }),
    }),
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("This is not a valid email"),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "at least 6 digit"),
    role: z
      .string({
        required_error: "Role is Required",
      })
      .refine((value) => value === ENUM_USER_ROLE.CLIENT, {
        message: "Invalid role",
      }),
    phoneNumber: z.string({
      required_error: "Phone Number is Required",
    }),

    dateOfBirth: z
      .string({
        required_error: "Date of Birth is Required",
      })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid date format",
      }),
    linkedinProfile: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (value) => {
          if (!value) return true;
          return value.startsWith("https://www.linkedin.com") ||  value?.startsWith("https://linkedin.com");
        },
        { message: "Invalid LinkedIn Profile URL" }
      ),
    businessType: z.string().optional(),
    jobTitle: z.string({
      required_error: "Job Title is Required",
    }),
    companyName: z.string().optional().or(z.literal("")),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("this is not a valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const ClientValidation = {
  signUpZodSchema,
  loginZodSchema,
};
