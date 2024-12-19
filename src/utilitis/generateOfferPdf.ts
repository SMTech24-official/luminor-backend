import PDFDocument from "pdfkit";
import { uploadFileToSpace } from "./uploadTos3";
import fs from "fs";
import { IOffer } from "../modules/offers/offer.interface";

export const generateOfferPDF = async (offer: IOffer): Promise<string> => {
  const doc = new PDFDocument();
  const buffers: Uint8Array[] = [];

  // Collect data into buffers
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => console.log("PDF generation complete"));

  // Generate PDF content
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
    offer.milestones &&
      offer.milestones.forEach((milestone: { title: any; price: any; }, index: number) => {
        doc.text(`Milestone ${index + 1}: ${milestone.title} - $${milestone.price}`, { align: "left" });
      });
  }
 
  doc.end();

  const pdfBuffer = Buffer.concat(buffers);

  // Write locally for testing (optional)
  fs.writeFileSync("test.pdf", pdfBuffer);

  // Upload to DigitalOcean Spaces
  const fileName = `offer_${Date.now()}.pdf`;
  const uploadedURL = await uploadFileToSpace(
    {
      buffer: pdfBuffer,
      originalname: fileName,
      mimetype: "application/pdf",
    },
    "offers"
  );

  return uploadedURL;
};
