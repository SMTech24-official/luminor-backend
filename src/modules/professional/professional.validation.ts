import { z } from "zod";
import { ENUM_USER_ROLE } from "../../enums/user";

// Validation schema for reference objects


// Validation schema for CV or cover letter objects
const fileSchema = z.object({
  fileName: z.string().nullable(),
  filePath: z.string().nullable(),
  fileType: z.string().nullable(),
});

// Validation schema for projects


// Main sign-up validation schema
const signUpZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("This is not a valid email"),
    role: z
      .string({
        required_error: "Role is required",
      })
      .refine((value) => (Object.values(ENUM_USER_ROLE) as string[]).includes(value), {
        message: "Invalid role",
      }),
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    password:z.string({
       required_error:"password is required"
    }).min(6,"at least 6 digit"),
    dateOfBirth: z
      .string({
        required_error: "Date of Birth is required",
      })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid date format",
      }), 
      linkedinProfile: z.string().optional(),
    
   
    previousPositions: z
      .array(z.string()),
      
      references: z
      .array(
        z.object({
          emailOrPhone: z.string({
            required_error: "Reference email or phone number is required",
          }),
          name: z.string({
            required_error: "Reference name is required",
          }),
        }),
        {
          required_error: "References are required",
        }
      )
      .nonempty("At least one reference must be provided"),
    educationalBackground: z.string({
      required_error: "Educational background is required",
    }),
    relevantQualification: z.string({
      required_error: "Relevant qualification is required",
    }),
    technicalSkill: z.string({
      required_error: "Technical skill is required",
    }),
    cvOrCoverLetter: fileSchema.optional(),
    softSkills:z.string({
      required_error:" technical or soft skills required"
    })
  }),
});

export const RetireProfessionalValidation = {
  signUpZodSchema,
};
