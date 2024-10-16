/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	childern?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
	options?: any[];
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
	const {
		fieldType,
		name = "",
		label = "",
		placeholder = "",
		iconSrc = "",
		iconAlt = "",
		showTimeSelect,
		dateFormat,
		renderSkeleton,
		options = [],
		childern,
		disabled = false,
	} = props;

	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{iconSrc && (
						<Image
							src={iconSrc}
							height={24}
							width={24}
							alt={iconAlt || "input-icon"}
							className="ml-2"
						/>
					)}
					<FormControl>
						<Input
							{...field}
							placeholder={placeholder}
							className="shad-input border-0"
						/>
					</FormControl>
				</div>
			);

		case FormFieldType.TEXTAREA:
			return (
				<FormControl>
					<Textarea
						{...field}
						placeholder={placeholder}
						className="shad-textArea"
						disabled={disabled}
					/>
				</FormControl>
			);

		case FormFieldType.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						placeholder={placeholder || "Enter phone number"}
						value={field.value as string | undefined}
						onChange={field.onChange}
						defaultCountry="IN"
						countries={["IN"]}
						international
						className="input-phone"
						countryCallingCodeEditable={false}
					/>
				</FormControl>
			);

		case FormFieldType.CHECKBOX:
			return (
				<FormControl>
					<div className="flex items-center gap-4">
						<Checkbox
							id={name}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<label htmlFor={name} className="checkbox-label">
							{label}
						</label>
					</div>
				</FormControl>
			);

		case FormFieldType.DATE_PICKER:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					<Image
						src="/assets/icons/calendar.svg"
						height={24}
						width={24}
						alt="calendar"
						className="ml-2"
					/>
					<FormControl>
						<DatePicker
							selected={field.value}
							onChange={(date) => field.onChange(date)}
							dateFormat={dateFormat ?? "dd/MM/yyyy"}
							showTimeSelect={showTimeSelect ?? false}
							timeInputLabel="Time:"
							className="date-picker"
						/>
					</FormControl>
				</div>
			);

		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<SelectTrigger className="shad-select-trigger">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent className="shad-select-content">
							{!childern &&
								options.map((option, index: number) => (
									<SelectItem key={index} value={option?.name}>
										<div className="flex cursor-pointer items-center gap-2">
											{option?.imageSrc && (
												<Image
													src={option?.imageSrc}
													alt={option?.name}
													width={32}
													height={32}
													className="rounded-full border border-dark-500"
												/>
											)}
											<p>{option?.name}</p>
										</div>
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</FormControl>
			);

		case FormFieldType.SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null;

		default:
			return null;
	}
};

const CustomFormField = (props: CustomProps) => {
	const { control, fieldType, name, label } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}
					<RenderField field={field} props={props} />
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
