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
      role: z
        .string({
          required_error: "Role is Required",
        })
        .refine(
          (value) => {
            return (Object.values(ENUM_USER_ROLE) as string[]).includes(value);
          },
          { message: "Invalid role" }
        ),
      phoneNumber: z
        .string({
          required_error: "Phone Number is Required",
        })
        .regex(/^\+880\d{10}$/, {
          message:
            "Phone number must start with +880 and be followed by exactly 10 digits",
        }),
      dateOfBirth: z
        .string({
          required_error: "Date of Birth is Required",
        })
        .refine(
          (value) => !isNaN(Date.parse(value)),
          { message: "Invalid date format" }
        ),
      businessType: z.string({
        required_error: "Business Type is Required",
      }),
      jobTitle: z.string({
        required_error: "Job Title is Required",
      }),
      companyName: z
        .string()
        .optional()
        .or(z.literal("")),
        linkedinProfile: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
          (value) => {
            if (!value) return true; 
            return value.startsWith("https://linkedin.com");
          },
          { message: "Invalid LinkedIn Profile URL" }
        ),
      password: z.string({
        required_error: "Password is Required",
      }),
    

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