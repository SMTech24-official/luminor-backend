"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndustryFromService = void 0;
const industryMapping = {
    'engineering_service': 'tech',
    'technical_services': 'tech',
    'healthcare_and_medical_consultency': 'finance',
    'business_consultency_and_management': 'finance',
    'educational_and_training': 'marketing',
    'legal_and_financial_services': 'finance',
};
const getIndustryFromService = (servicePreferences) => {
    return servicePreferences.map(service => industryMapping[service] || 'Other');
};
exports.getIndustryFromService = getIndustryFromService;
