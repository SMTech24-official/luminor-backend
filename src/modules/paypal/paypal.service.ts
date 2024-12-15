import https from "https";
import config from "../../config";
import { getPayPalAccessToken } from "../../utilitis/getPaypalAccessToken";



//payment from owner to rider
const paypalPayementClientToProfessional = async (riderPaypalEmail: string, amount: number) => {
  const clientId = config.paypal.paypalClientId;
  const secret = config.paypal.paypalSecretId;
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const url = new URL("https://api.sandbox.paypal.com/v1/payments/payouts");

  const payoutData = JSON.stringify({
    sender_batch_header: {
      sender_batch_id: `${Date.now()}`, // Unique batch ID
      email_subject: "You have a payment",
    },
    items: [
      {
        recipient_type: "EMAIL",
        amount: {
          value: amount.toFixed(2), // Amount to send
          currency: "USD",
        },
        receiver: riderPaypalEmail,
        note: "Thank you for your business!",
        sender_item_id: "item-1",
      },
    ],
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payoutData).toString(),
    },
  };

  return new Promise((resolve, reject) => {
    const request = https.request(url, options, (response: any) => {
      let data = "";

      response.on("data", (chunk: any) => {
        data += chunk;
      });

      response.on("end", () => {
        const result = JSON.parse(data);

        if (
          response.statusCode === 201 ||
          response.statusCode === 200 ||
          response.statusCode === 300
        ) {
          const transactionId = result.batch_header.payout_batch_id; // Extract transaction ID
          resolve({
            success: true,
            email: riderPaypalEmail,
            transactionId: transactionId,
            amount: amount.toFixed(2),
          });
        } else {
          reject({ success: false, message: result });
        }
      });
    });

    request.on("error", (error: any) => {
      console.error("Error sending payment:", error);
      reject({ success: false, message: "Failed to send payment." });
    });

    request.write(payoutData);
    request.end();
  });
};




export const paymentService = {
    paypalPayementClientToProfessional,

};
