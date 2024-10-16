"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
	Doctors,
	GenderOptions,
	IdentificationTypes,
	PatientFormDefaultValues,
} from "@/constants";
import { Label } from "@radix-ui/react-label";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			name: "",
			email: "",
			phone: "",
		},
	});

	async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
		setIsLoading(true);
		let formData;
		if (
			values?.identificationDocument &&
			values?.identificationDocument.length
		) {
			const blobFile = new Blob([values.identificationDocument[0]], {
				type: values?.identificationDocument[0].name,
			});
			formData = new FormData();
			formData.append("blobFile", blobFile);
			formData.append("fileName", values.identificationDocument[0].name);
		}
		try {
			const patientData = {
				...values,
				userId: user.$id,
				birthDate: values.birthDate,
				identificationDocument: formData,
			};
			const newPatient = await registerPatient(patientData);
			console.log("patient=>>", newPatient);
			setIsLoading(false);
			if (user) router.push(`/patients/${user.$id}/new-appointment`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12 flex-1">
				<section className="space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">Let us know more about your self</p>
				</section>
				<section className="space-y-6">
					<div className="space-y-1 mb-9">
						<h2 className="sub-header">Personal Information</h2>
					</div>
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
				<div className="flex flex-col gap-6 xl:flex-row">
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
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.DATE_PICKER}
						name="birthDate"
						label="Date of Birth"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.SKELETON}
						name="gender"
						label="Gender"
						renderSkeleton={(field) => (
							<FormControl>
								<RadioGroup
									className="flex h-11 gap-6 xl:justify-between"
									onValueChange={field.onChenge}
									defaultValue={field.value}>
									{GenderOptions.map(({ label, value }) => (
										<div key={value} className="radio-group">
											<RadioGroupItem value={value} id={value} />
											<Label htmlFor={value} className="cursor-pointer">
												{label}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						)}
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="address"
						label="Address"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="occupation"
						label="Occupation"
						placeholder="Software Engineer"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="emergencyContactName"
						label="Emergency Contact Name"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="emergencyContactNumber"
						label="Emergency Contact Number"
						placeholder="123 456 7890"
					/>
				</div>

				<section className="space-y-6">
					<div className="space-y-1 mb-9">
						<h2 className="sub-header">Medical Information</h2>
					</div>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.SELECT}
					name="primaryPhysician"
					label="Primary Physician"
					placeholder="Select a Physician"
					options={Doctors}
				/>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="insuranceProvider"
						label="Insurance Provider"
						placeholder="Please enter"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="insurancePolicyNumber"
						label="Insurance Policy Number"
						placeholder="Please enter"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="allergies"
						label="Allergies"
						placeholder="Peanuts, Penicillin"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="currentMedication"
						label="Current Medication"
						placeholder="Paracetamol 500mg"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="familyMedicalHistory"
						label="Family Medical History"
						placeholder="Please enter"
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="pastMedicalHistory"
						label="Past Medical History"
						placeholder="Please enter"
					/>
				</div>
				<section className="space-y-6">
					<div className="space-y-1 mb-9">
						<h2 className="sub-header">Identification and Verification</h2>
					</div>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.SELECT}
					name="identificationType"
					label="Identification Type"
					placeholder="Select an identification type"
					options={IdentificationTypes}
				/>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name="identificationNumber"
					label="Identification Number"
					placeholder="123456789"
				/>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.SKELETON}
					name="identificationDocument"
					label="Scanned copy of identification document"
					renderSkeleton={(field) => (
						<FormControl>
							<FileUploader files={field.value} onChange={field.onChange} />
						</FormControl>
					)}
				/>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.CHECKBOX}
					name="treatmentConsent"
					label="I consent to treatment"
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.CHECKBOX}
					name="disclosureConsent"
					label="I consent to disclosure of information"
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.CHECKBOX}
					name="privacyConsent"
					label="I consent to privacy policy"
				/>

				<SubmitButton isLoading={isLoading} className="">
					Get Started
				</SubmitButton>
			</form>
		</Form>
	);
};

export default RegisterForm;
