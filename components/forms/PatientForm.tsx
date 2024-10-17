"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/types/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

export enum FormFieldType {
	INPUT = "input",
	PHONE_INPUT = "phone",
	CHECKBOX = "checkbox",
	DATE_PICKER = "datepicker",
	SKELETON = "skeleton",
	SELECT = "select",
	TEXTAREA = "textarea",
}

const PatientForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	async function onSubmit(userData: z.infer<typeof UserFormValidation>) {
		setIsLoading(true);
		try {
			const user = await createUser(userData);
			console.log(user);
			setIsLoading(false);
			if (user) router.push(`/patients/${user.$id}/register`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Hi there 👋</h1>
					<p className="text-dark-700">Schedule your first appointment.</p>
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
				<SubmitButton isLoading={isLoading} className="">
					Get Started
				</SubmitButton>
			</form>
		</Form>
	);
};

export default PatientForm;
