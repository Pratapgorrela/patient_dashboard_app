/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import Button from "@/components/ButtonAtom";
import { PatientFormValidation } from "@/features/userapp/types/validation";
import {
	getPatient,
	registerPatient,
	updatePatient,
} from "@/features/userapp/db/actions/patient.actions";
import { FormFieldType, GenderOptions } from "@/constants";
import FileUploader from "@/components/FileUploader";
import { IdentificationTypes, PatientFormDefaultValues } from "../../constants";
import { User } from "next-auth";
import { Patient } from "@/types/appwrite.type";
import AlertNote from "@/components/AlertNote";
import { app_constants } from "@/constants/config";
import { getIcons, ICON_NAMES } from "@/lib/service";

const RegisterForm = ({ user }: { user?: User }) => {
	const { DEFAULT_ALERT_CONFIG, ERROR_ALERT_CONFIG } = app_constants;

	const [isLoading, setIsLoading] = useState(false);
	const [patient, setPatientData] = useState<Patient | undefined | null>(null);
	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const firstRender = useRef(true);
	const isIdendificationDocUpdated = useRef(false);
	const isSuccess = useRef(false);

	const icons = getIcons([ICON_NAMES.user, ICON_NAMES.email]);

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			name: user?.name || "",
			email: user?.email || "",
			phone: user?.phone || "",
			treatmentConsent: false,
			disclosureConsent: false,
			privacyConsent: false,
		},
	});

	useEffect(() => {
		try {
			const fetchPatientData = async () => {
				firstRender.current = false;
				const data: Patient | undefined | null = await getPatient(
					user?.userId || "6807dc2f00116c0235f2"
				);
				// data && form.reset(data);
				setPatientData(data);
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			firstRender.current && fetchPatientData();
		} catch (err: unknown) {
			console.log(err);
		}
	}, []);

	async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
		try {
			setIsLoading(true);
			let formData;
			if (
				values?.identificationDocument &&
				values?.identificationDocument.length &&
				isIdendificationDocUpdated.current
			) {
				const blobFile = new Blob([values?.identificationDocument?.[0]], {
					type: values?.identificationDocument?.[0]?.name,
				});
				formData = new FormData();
				formData.append("blobFile", blobFile);
				formData.append("fileName", values.identificationDocument[0].name);
			}
			if (user && !patient) {
				// CREATE PATIENT
				const patientData = {
					...values,
					userId: user.$id!,
					clientId: user.clientId!,
					identificationDocument: formData,
				};
				const newPatient = await registerPatient(patientData);
				setPatientData(newPatient);
			} else if (patient?.$id) {
				//UPDATE PATIENT
				const { identificationDocument, ...rest } = values;
				console.log(identificationDocument);
				const patientData = {
					patient: rest,
					patientId: patient.$id,
					identificationDocument: formData,
				};
				const updatedPatient = await updatePatient(patientData);
				setPatientData(updatedPatient);
			}
			setIsAlertOpen(true);
			isSuccess.current = true;
		} catch (error) {
			console.log(error);
			setIsAlertOpen(true);
			isSuccess.current = false;
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<AlertNote
				open={isAlertOpen}
				setIsopen={setIsAlertOpen}
				{...(isSuccess.current ? DEFAULT_ALERT_CONFIG : ERROR_ALERT_CONFIG)}
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-12 flex-1 pb-10"
				>
					<section className="space-y-4 flex items-center md:items-start flex-col">
						<h1 className="header !text-xl pt-4 md:!text-3xl md:pt-0 ">
							Welcome 👋
						</h1>
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
						icon={icons?.[ICON_NAMES.user]}
						required
						disabled
					/>
					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.INPUT}
							name="email"
							label="Email"
							icon={icons?.[ICON_NAMES.email]}
							required
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.PHONE_INPUT}
							name="phone"
							label="Phone number"
							placeholder="123 456 7890"
							required
							disabled
						/>
					</div>

					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.DATE_PICKER}
							name="birthDate"
							label="Date of Birth"
							required
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.RADIO_GROUP}
							name="gender"
							label="Gender"
							options={GenderOptions}
							required
						/>
					</div>

					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.INPUT}
							name="address"
							label="Address"
							required
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.INPUT}
							name="occupation"
							label="Occupation"
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
						/>
					</div>

					<section className="space-y-6">
						<div className="space-y-1 mb-9">
							<h2 className="sub-header">Medical Information</h2>
						</div>
					</section>

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
							placeholder="Ex: Peanuts, Penicillin"
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.TEXTAREA}
							name="currentMedication"
							label="Current Medication"
							placeholder="Please enter"
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
					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.SELECT}
							name="identificationType"
							selectKey="name"
							optionLabel="name"
							label="Identification Type"
							placeholder="Select an identification type"
							options={IdentificationTypes}
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.INPUT}
							name="identificationNumber"
							label="Identification Number"
							placeholder="please enter"
						/>
					</div>

					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.SKELETON}
						name="identificationDocument"
						label="Scanned copy of identification document"
						renderSkeleton={(field) => (
							<FormControl>
								<FileUploader
									files={field.value}
									onChange={(value) => {
										field.onChange(value);
										isIdendificationDocUpdated.current = true;
									}}
								/>
							</FormControl>
						)}
					/>

					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.CHECKBOX}
						name="treatmentConsent"
						label="I consent to treatment"
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.CHECKBOX}
						name="disclosureConsent"
						label="I consent to disclosure of information"
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.CHECKBOX}
						name="privacyConsent"
						label="I consent to privacy policy"
						required
					/>
					<div className="md:mx-60">
						<Button isLoading={isLoading}>
							{patient?.privacyConsent ? "Update" : "Save"} your details
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default RegisterForm;
