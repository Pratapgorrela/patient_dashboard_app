import { AppointmentActionsType } from "@/constants";
import { z } from "zod";

export const UserSignupFormValidation = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	email: z.string().email("Invalid email address").optional(),
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
});

export const UserLoginFormValidation = z.object({
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	email: z.string().email("Invalid email address"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
	birthDate: z.coerce.date().optional(),
	gender: z.enum(["male", "female", "other"]),
	address: z
		.string()
		.min(5, "Address must be at least 5 characters")
		.max(500, "Address must be at most 500 characters")
		.or(z.literal("")),
	occupation: z
		.string()
		.min(3, "Occupation must be at least 3 characters")
		.max(500, "Occupation must be at most 500 characters")
		.or(z.literal("")),
	emergencyContactName: z
		.union([
			z.string().min(3, "Emergency contact name must be at least 3 characters"),
			z.string().length(0),
		])
		.optional(),
	emergencyContactNumber: z
		.string()
		.regex(/^\+\d{12}$/, { message: "Invalid phone number" })
		.optional()
		.or(z.literal("")),
	allergies: z.string().optional(),
	primaryPhysicianId: z.string().optional(),
	insuranceProvider: z.string().optional(),
	insurancePolicyNumber: z.string().optional(),
	currentMedication: z.string().optional(),
	familyMedicalHistory: z.string().optional(),
	pastMedicalHistory: z.string().optional(),
	identificationType: z.string().optional(),
	identificationNumber: z.string().optional(),
	identificationDocument: z.custom<File[]>().optional(),
	treatmentConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: "You must consent to treatment in order to proceed",
		}),
	disclosureConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: "You must consent to disclosure in order to proceed",
		}),
	privacyConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: "You must consent to privacy in order to proceed",
		}),
});

export const CreateAppointmentSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
	email: z.string().email("Invalid email address").optional(),
	gender: z.enum(["male", "female", "other"]),
	primaryPhysicianId: z.string().optional(),
	schedule: z.coerce.date(),
	reason: z
		.string()
		.min(2, "Please provide the reason")
		.max(500, "Reason must be at most 500 characters"),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
	email: z.string().email("Invalid email address").optional(),
	gender: z.enum(["male", "female", "other"]),
	primaryPhysicianId: z.string().min(2, "Please select doctor").optional(),
	schedule: z.coerce.date(),
	reason: z.string(),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
	email: z.string().email("Invalid email address").optional(),
	gender: z.enum(["male", "female", "other"]),
	primaryPhysicianId: z.string().optional(),
	schedule: z.coerce.date(),
	reason: z.string(),
	note: z.string().optional(),
	cancellationReason: z
		.string()
		.min(2, "Reason must be at least 2 characters")
		.max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
	switch (type) {
		case AppointmentActionsType.CREATE.key:
		case AppointmentActionsType.UPDATE.key:
			return CreateAppointmentSchema;

		case AppointmentActionsType.CANCEL.key:
			return CancelAppointmentSchema;

		default:
			return ScheduleAppointmentSchema;
	}
}
