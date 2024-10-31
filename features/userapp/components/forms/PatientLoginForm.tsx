"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { useState } from "react";
import { UserLoginFormValidation } from "@/features/userapp/types/validation";
// import { useRouter } from "next/navigation";
// import {
// 	generatePhoneToken,
// 	validateUserLogin,
// } from "../../db/actions/patient.actions";
import { FormFieldType } from "@/constants";
import { Models } from "node-appwrite";
import PasskeyModal from "@/components/PasskeyModal";
import { handleCredentialsSignIn } from "@/lib/actions/auth.actions";

const PatientLoginForm = () => {
	// const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState<Models.Token | null>(null);

	const form = useForm<z.infer<typeof UserLoginFormValidation>>({
		resolver: zodResolver(UserLoginFormValidation),
		defaultValues: {
			phone: "",
		},
	});

	async function onSubmit(values: z.infer<typeof UserLoginFormValidation>) {
		setIsLoading(true);
		try {
			const userData = {
				phone: values.phone,
				$id: "1",
				$createdAt: "",
				userId: "12345",
				secret: "string",
				expire: "string",
				phrase: "string",
			};
			// const userData = await generatePhoneToken(values.phone);
			setToken(userData);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setToken(null);
		}
	}

	const validatePasskey = async (passkey: string) => {
		// const session = token?.userId
		// 	? await validateUserLogin(token.userId, passkey)
		// 	: null;
		// console.log("session=>>", session);
		if (passkey === "123456") {
			const session = {
				email: "test33@gmail.com",
				phone: "+918887654345",
				name: "Pratap",
			};
			await handleCredentialsSignIn({
				email: session.email,
				phone: session.phone,
				name: session.name,
			});
			return "Success";
		}
		return "Invalid OTP. Please try again!";
	};

	return (
		<div>
			{token?.userId && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					redirectUrl="/patients/fortis/dashboard"
				/>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1">
					<section className="mb-12 space-y-4">
						<h1 className="header">Hi there 👋</h1>
						<p className="text-dark-700">
							Login to Schedule your first appointment.
						</p>
					</section>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						placeholder="123 456 7890"
					/>
					<Button isLoading={isLoading}>Get Started</Button>
				</form>
			</Form>
		</div>
	);
};

export default PatientLoginForm;
