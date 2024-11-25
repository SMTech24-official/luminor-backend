import { z } from "zod";

const retireProfessionalProfileSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),

    retireProfessional: z
      .string({
        required_error: "Retire professional ID is required",
      })
      .length(24, "Retire professional ID must be 24 characters long"),

    location: z
      .string({
        required_error: "Location is required",
      })
      .min(3, "Location must be at least 3 characters long"),

    bio: z
      .string({
        required_error: "Bio is required",
      })
      .min(10, "Bio must be at least 10 characters long"),

    description: z.string().optional(), // Optional field

    skills: z
      .string({
        required_error: "Skills are required",
      })
      .min(3, "Skills must be at least 3 characters long"),

    availability: z
      .boolean({
        required_error: "Availability is required",
      })
      .refine((value) => value === true || value === false, {
        message: "Availability must be a boolean value (true or false)",
      }),

    projects: z
      .array(
        z.object({
          preferredProjects: z
            .string({
              required_error: "Preferred project is required",
            })
            .min(3, "Preferred project must be at least 3 characters long"),

          hourlyRate: z
            .string({
              required_error: "Hourly rate is required",
            })
            .min(1, "Hourly rate must be at least 1 character long"),

          workSample: z.string().optional(), // Optional field
        })
      )
      .min(1, "At least one project must be added")
      .optional(), // Projects is an optional array, but if provided, it must have at least one item
  }),
});

export const RetireProfessionalProfileValidation = {
  retireProfessionalProfileSchema,
};
