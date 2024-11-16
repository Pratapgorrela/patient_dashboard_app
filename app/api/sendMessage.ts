import { generateRandomSixDigitNumber } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
	const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
	const token = <string>process.env.TWILIO_AUTH_TOKEN;
	const client = twilio(accountSid, token);
	const { phone } = req.body;
	client.messages
		.create({
			body: `Your OTP is: ${generateRandomSixDigitNumber()}`,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phone,
		})
		.then(() => {
			res.json({
				success: true,
			});
		})
		.catch((error) => {
			console.log(error);
			res.json({
				success: false,
			});
		});
}
