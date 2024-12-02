"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetireProfessionalValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../enums/user");
// Validation schema for reference objects
// Validation schema for CV or cover letter objects
const fileSchema = zod_1.z.object({
    fileName: zod_1.z.string().nullable(),
    filePath: zod_1.z.string().nullable(),
    fileType: zod_1.z.string().nullable(),
});
// Validation schema for projects
// Main sign-up validation schema
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required",
            }),
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("This is not a valid email"),
        role: zod_1.z
            .string({
            required_error: "Role is required",
        })
            .refine((value) => Object.values(user_1.ENUM_USER_ROLE).includes(value), {
            message: "Invalid role",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        dateOfBirth: zod_1.z
            .string({
            required_error: "Date of Birth is required",
        })
            .refine((value) => !isNaN(Date.parse(value)), {
            message: "Invalid date format",
        }),
        linkedinProfile: zod_1.z.string().optional(),
        previousPositions: zod_1.z
            .array(zod_1.z.string()),
        references: zod_1.z
            .array(zod_1.z.object({
            emailOrPhone: zod_1.z.string({
                required_error: "Reference email or phone number is required",
            }),
            name: zod_1.z.string({
                required_error: "Reference name is required",
            }),
        }), {
            required_error: "References are required",
        })
            .nonempty("At least one reference must be provided"),
        educationalBackground: zod_1.z.string({
            required_error: "Educational background is required",
        }),
        relevantQualification: zod_1.z.string({
            required_error: "Relevant qualification is required",
        }),
        technicalSkill: zod_1.z.string({
            required_error: "Technical skill is required",
        }),
        cvOrCoverLetter: fileSchema.optional(),
        softSkills: zod_1.z.string({
            required_error: " technical or soft skills required"
        })
    }),
});
exports.RetireProfessionalValidation = {
    signUpZodSchema,
};
