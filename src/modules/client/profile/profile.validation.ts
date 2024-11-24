import { z } from "zod";

const clientProfileSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is Required",
      }),
      lastName: z.string({
        required_error: "Last Name is Required",
      }),
    }),

    client: z
      .string({
        required_error: "Client ID is required",
      })
      .regex(/^[a-f\d]{24}$/i, "Invalid Client ID format"),

    companyName: z.string({
      required_error: "Company name is required",
    }),

    companyWebsite: z
      .string({
        required_error: "Company website is required",
      })
      .url("Invalid URL format"),

    problemAreas: z.string({
      required_error: "Problem areas are required",
    }),

    location: z.string({
      required_error: "Location is required",
    }),

    description: z.string().optional(), // Optional description field

    industry: z.string({
      required_error: "Industry is required",
    }),

    servicePreferences: z.string({
      required_error: "Service preferences are required",
    }),

    // Updated budgetRange to an object with min and max fields
    budgetRange: z.object({
      min: z
        .number({
          required_error: "Min budget range is required",
        })
        .nonnegative("Min budget must be a positive number"),
      max: z
        .number({
          required_error: "Max budget range is required",
        })
        .nonnegative("Max budget must be a positive number"),
    }),

    projectDurationRange: z
      .number({
        required_error: "Project duration range is required",
      })
      .nonnegative("Project duration range must be a positive number"),

    projectListing: z
      .object({
        fileName: z.string({
          required_error: "File name is required",
        }),
        filePath: z.string({
          required_error: "File path is required",
        }),
        fileType: z.string().optional(), // Optional file type
      })
      .optional(),
  }),
});

export const ClientProfileValidation = {
  clientProfileSchema,
};
