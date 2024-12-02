
 const industryMapping: { [key: string]: string } = {
    'engineering_service': 'tech',
    'technical_services': 'tech',
    'healthcare_and_medical_consultency': 'finance',
    'business_consultency_and_management': 'finance',
    'educational_and_training': 'marketing', 
    'legal_and_financial_services': 'finance',
  };
  

  export const getIndustryFromService = (servicePreferences: string[]): string[] => {
    return servicePreferences.map(service => industryMapping[service] || 'Other');
  };