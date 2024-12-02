import { IOffer } from "../modules/offers/offer.interface";
import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit"; 

export const generateOfferPDF = async (offer: IOffer): Promise<string> => {
  const doc = new PDFDocument();
  
  const fileName = `offer_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, "../../uploads", fileName);

  // Pipe the PDF output to a file
  doc.pipe(fs.createWriteStream(filePath));


  doc.fontSize(16).text(`Offer for Project: ${offer.projectName}`, { align: "left" });
  doc.text(`Description: ${offer.description}`, { align: "left" });
  doc.text(`Agreement Type: ${offer.agreementType}`, { align: "left" });
  doc.text(`Total Price: ${offer.totalPrice}`, { align: "left" });

  if (offer.agreementType === "Flat_Fee") {
    doc.text(`Flat Fee Price: ${offer.flatFee?.price}`, { align: "left" });
  } else if (offer.agreementType === "Hourly_Fee") {
    doc.text(`Hourly Rate: ${offer.hourlyFee?.pricePerHour}`, { align: "left" });
  } else if (offer.agreementType === "Milestone") {
    doc.text(`Milestones:`, { align: "left" });
    offer.milestones && offer.milestones.forEach((milestone, index) => {
      doc.text(`Milestone ${index + 1}: ${milestone.title} - $${milestone.price}`, { align: "left" });
    });
  }

  
  doc.end();

  return filePath;
};
