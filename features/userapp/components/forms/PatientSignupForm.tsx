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
import { getIcons, ICON_NAMES } from "@/lib/service";

const PatientSignupForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const icons = getIcons([ICON_NAMES.user, ICON_NAMES.email]);

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
			setIsLoading(false);
			if (user) router.push(`/patient/fortis/dashboard`);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const handleLogin = () => {
		router.push(`/fortis/patient/login`);
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
						placeholder="Full name"
						icon={icons?.[ICON_NAMES.user]}
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="email"
						label="Email"
						placeholder="Email"
						icon={icons?.[ICON_NAMES.email]}
					/>
					<Button isLoading={isLoading}>Get Started</Button>
					<Button
						variant="ghost"
						className="shad-gray-btn"
						onClick={handleLogin}
						type="button">
						{`Already have a account? `}
						<b>Login</b>
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PatientSignupForm;
