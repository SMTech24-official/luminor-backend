const industryMapping: { [key: string]: string } = {
  engineering_service: "tech",
  technical_services: "tech",
  healthcare_and_medical_consultency: "finance",
  business_consultency_and_management: "finance",
  educational_and_training: "marketing",
  legal_and_financial_services: "finance",
};

// Map expertise to a single industry
export const getIndustryFromService = (servicePreference: string): string => {
  return industryMapping[servicePreference] || "Other";
};
