"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { useState } from "react";
import { UserSignupFormValidation } from "@/features/userapp/types/validation";
import { createUser } from "@/features/userapp/db/actions/patient.actions";
import { useRouter } from "next/navigation";
import {
	handleCredentialsSignIn,
	// handleSignOut,
} from "@/lib/actions/auth.actions";
import { FormFieldType } from "@/constants";

const PatientSignupForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof UserSignupFormValidation>>({
		resolver: zodResolver(UserSignupFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	async function onSubmit(userData: z.infer<typeof UserSignupFormValidation>) {
		setIsLoading(true);
		try {
			const user = await createUser(userData);
			await handleCredentialsSignIn(userData);
			if (user) router.push(`/patients/fortis/register`);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	const handleLogin = () => {
		router.push(`/patients/fortis/login`);
	};

	return (
		<>
			{/* <form action={handleSignOut}>
				<Button onClick={handleSignOut}>SignOut</Button>
			</form> */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1">
					<section className="mb-12 space-y-4">
						<h1 className="header">Hi there 👋</h1>
						<p className="text-dark-700">
							Signup to Schedule your first appointment.
						</p>
					</section>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="name"
						label="Full name"
						placeholder="Pratap"
						iconSrc="/assets/icons/user.svg"
						iconAlt="user"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="email"
						label="Email"
						placeholder="pratap@gmail.com"
						iconSrc="/assets/icons/email.svg"
						iconAlt="email"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						placeholder="123 456 7890"
					/>
					<Button isLoading={isLoading}>Get Started</Button>
					<Button isLoading={isLoading} onClick={handleLogin} type="button">
						Login
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PatientSignupForm;
