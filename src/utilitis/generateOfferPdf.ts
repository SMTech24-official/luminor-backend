import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { uploadFileToSpace } from "./uploadTos3";
import { IOffer } from "../modules/offers/offer.interface";

export const generateOfferPDF = async (offer: IOffer) => {
  try {
    // Define the local file path
    const fileName = `offer_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "..", "uploads", fileName);

    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Initialize PDFKit
    const doc = new PDFDocument();

    // Write the PDF to the local file system
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc
      .fontSize(16)
      .text(`Offer for Project: ${offer.projectName}`, { align: "left" });
    doc.text(`Description: ${offer.description}`, { align: "left" });
    doc.text(`Agreement Type: ${offer.agreementType}`, { align: "left" });
    doc.text(`Total Price: ${offer.totalPrice}`, { align: "left" });

    if (offer.agreementType === "Flat_Fee") {
      doc.text(`Flat Fee Price: ${offer.flatFee?.price}`, { align: "left" });
    } else if (offer.agreementType === "Hourly_Fee") {
      doc.text(`Hourly Rate: ${offer.hourlyFee?.pricePerHour}`, {
        align: "left",
      });
    } else if (offer.agreementType === "Milestone") {
      doc.text(`Milestones:`, { align: "left" });
      offer.milestones?.forEach(
        (milestone: { title: any; price: any }, index: number) => {
          doc.text(
            `Milestone ${index + 1}: ${milestone.title} - $${milestone.price}`,
            { align: "left" }
          );
        }
      );
    }

    doc.end();

    // Wait for the file to be completely written
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log("PDF generated locally:", filePath);

    // Upload the file to DigitalOcean Spaces
    const uploadedURL = await uploadFileToSpace(
      {
        buffer: fs.readFileSync(filePath),
        originalname: fileName,
        mimetype: "application/pdf",
      },
      "offers"
    );

    console.log("PDF uploaded to DigitalOcean Spaces:", uploadedURL);

    // Optionally delete the local file after uploading
    fs.unlinkSync(filePath);

    return uploadedURL;
  } catch (error) {
    console.error("Error generating or uploading PDF:", error);
    throw error;
  }
};
