/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { UserLoginFormValidation } from "@/features/userapp/types/validation";
// import {
// generatePhoneToken,
// getUserByPhone,
// validateUserLogin,
// } from "../../db/actions/patient.actions";
import { FormFieldType } from "@/constants";
import { Models } from "node-appwrite";
import PasskeyModal from "@/components/PasskeyModal";
import { handleCredentialsSignIn } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { PatientData, SessionData, TokenData } from "@/data/data";
import { Patient } from "@/types/appwrite.type";

const PatientLoginForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState<Models.Token | null>(null);
	const [patient, setPatient] = useState<Patient | null | undefined>();
	const [error, setError] = useState("");

	const form = useForm<z.infer<typeof UserLoginFormValidation>>({
		resolver: zodResolver(UserLoginFormValidation),
		defaultValues: {
			phone: "",
		},
	});

	async function onSubmit(values: z.infer<typeof UserLoginFormValidation>) {
		setError("");
		setPatient(null);
		setIsLoading(true);
		try {
			// const patient = await getUserByPhone(values.phone);
			const patient = PatientData;
			setPatient(patient);
			if (values.phone === patient.phone && patient?.$id) {
				// const tokenData = await generatePhoneToken(values.phone);
				const tokenData = TokenData;
				setToken(tokenData as Models.Token);
			} else {
				setError("User does not exist! Please signup to create appointment.");
				setToken(null);
			}
		} catch (error) {
			console.log(error);
			setToken(null);
		} finally {
			setIsLoading(false);
		}
	}

	const validatePasskey = async (passkey: string) => {
		// const session = token?.userId
		// 	? await validateUserLogin(token.userId, passkey)
		// 	: null;
		const session = SessionData;
		if (passkey === "123321" && session?.secret && patient) {
			await handleCredentialsSignIn(patient);
			return "Success";
		}
		return "Invalid OTP. Please try again!";
	};

	const handleSignup = () => {
		router.push(`/fortis/patient/signup`);
	};

	return (
		<div>
			{token?.userId && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					redirectUrl="/fortis/patient/dashboard"
				/>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1">
					<section className="mb-12 space-y-4">
						<h1 className="header">Hi there 👋</h1>
						<p className="text-dark-700">Login to schedule your appointment.</p>
					</section>

					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						placeholder="123 456 7890"
						onChange={() => setError("")}
					/>
					<div className="text-red-500">{error}</div>
					<Button isLoading={isLoading}>Login</Button>
					<Button
						variant="ghost"
						className="shad-gray-btn"
						type="button"
						onClick={handleSignup}>
						{`Don't have a account? `}
						<b>Sign Up</b>
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PatientLoginForm;
