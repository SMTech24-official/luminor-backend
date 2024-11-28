export interface IProfessional {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email:  string;
    phoneNumber: string;
    industry: string;
    previousPositions: string [];
    references: {
        name: string;
        contact: string;
    }[];
    educationalBackground: string;
    relevantQualifications: string;
    technicalAndSoftSkills: string;
    linkedinProfile?: string;
    coverLetter: string;
    password: string;
    location?: string;
    bio?: string;
    description?: string;
    availability?: Boolean;
    preferredProjects?: string;
    hourlyRate?: number; 
    profession: string;
    yearsOfExperience: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}                  