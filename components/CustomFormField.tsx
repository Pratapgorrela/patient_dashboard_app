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
import { FormFieldType } from "@/constants";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ReactNode } from "react";

interface CustomProps {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string | ReactNode;
	required?: boolean;
	optionLabel?: string;
	placeholder?: string;
	icon?: ReactNode;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	childern?: ReactNode;
	renderSkeleton?: (field: any) => ReactNode;
	options?: any[];
	selectKey?: string;
	minDate?: Date;
	maxDate?: Date;
	onChange?: (value: any) => void;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
	const {
		fieldType,
		name = "",
		label = "",
		optionLabel = "label",
		placeholder = "",
		icon = null,
		iconSrc = "",
		iconAlt = "",
		selectKey = "name",
		showTimeSelect,
		dateFormat,
		renderSkeleton,
		options = [],
		childern,
		disabled = false,
		minDate = undefined,
		maxDate = undefined,
		onChange,
	} = props;

	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{iconSrc ? (
						<Image
							src={iconSrc}
							height={24}
							width={24}
							alt={iconAlt || "input-icon"}
							className="ml-2"
						/>
					) : (
						icon
					)}
					<FormControl>
						<Input
							{...field}
							placeholder={placeholder}
							className="shad-input border-0"
							disabled={disabled}
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
						onChange={(value) => {
							// eslint-disable-next-line @typescript-eslint/no-unused-expressions
							onChange && onChange(value);
							field.onChange(value);
						}}
						defaultCountry="IN"
						countries={["IN"]}
						international
						className="input-phone"
						countryCallingCodeEditable={false}
						disabled={disabled}
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
							defaultChecked={true}
							disabled={disabled}
						/>
						<label htmlFor={name} className="checkbox-label">
							{label}
						</label>
					</div>
				</FormControl>
			);

		case FormFieldType.RADIO_GROUP:
			return (
				<FormControl>
					<RadioGroup
						className="flex h-11 gap-6 xl:justify-between"
						onValueChange={field.onChenge}
						defaultValue={field.value}
						disabled={disabled}>
						{options?.map(({ label, value }) => (
							<div key={value} className="radio-group">
								<RadioGroupItem value={value} id={value} />
								<Label htmlFor={value} className="cursor-pointer">
									{label}
								</Label>
							</div>
						))}
					</RadioGroup>
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
							minDate={minDate}
							maxDate={maxDate}
							disabled={disabled}
						/>
					</FormControl>
				</div>
			);

		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						value={field.value}
						disabled={disabled}>
						<SelectTrigger className="shad-select-trigger">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent className="shad-select-content">
							{!childern &&
								options.map((option, index: number) => (
									<SelectItem key={index} value={option?.[selectKey]}>
										<div className="flex cursor-pointer items-center gap-2">
											{option?.profileImgUrl && (
												<Image
													src={option?.profileImgUrl}
													alt={option?.[selectKey]}
													width={32}
													height={32}
													className="rounded-full border border-dark-500"
												/>
											)}
											<p>{option?.[optionLabel]}</p>
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
	const { control, fieldType, name, label, required = false } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel className="text-base">
							{label}
							{required ? <span className="text-red-800 ml-1">*</span> : null}
						</FormLabel>
					)}
					<RenderField field={field} props={props} />
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
