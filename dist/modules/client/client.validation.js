"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../enums/user");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is Required",
            }),
        }),
        email: zod_1.z
            .string({
            required_error: "Email is Required",
        })
            .email("This is not a valid email"),
        role: zod_1.z
            .string({
            required_error: "Role is Required",
        })
            .refine((value) => {
            return Object.values(user_1.ENUM_USER_ROLE).includes(value);
        }, { message: "Invalid role" }),
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone Number is Required",
        }),
        dateOfBirth: zod_1.z
            .string({
            required_error: "Date of Birth is Required",
        })
            .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date format" }),
        linkedinProfile: zod_1.z
            .string()
            .optional()
            .or(zod_1.z.literal(""))
            .refine((value) => {
            if (!value)
                return true;
            return value.startsWith("https://linkedin.com");
        }, { message: "Invalid LinkedIn Profile URL" }),
        industry: zod_1.z.string().optional(),
        jobTitle: zod_1.z.string({
            required_error: "Job Title is Required",
        }),
        companyName: zod_1.z
            .string()
            .optional()
            .or(zod_1.z.literal("")),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email("this is not a valid email"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.ClientValidation = {
    signUpZodSchema,
    loginZodSchema,
};
