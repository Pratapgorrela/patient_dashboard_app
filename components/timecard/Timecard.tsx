"use client";

import { z } from "zod";
import Button from "../ButtonAtom";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TimeCardFormValidation } from "@/features/docapp/validations";
import CustomFormField from "../CustomFormField";
import { DEFAULT_WORKING_HOURS, FormFieldType } from "@/constants";
import {
	AvailabilityOptions,
	TimeCardStatusTypes,
} from "@/features/docapp/constants";
import { useState } from "react";

const TimeCardData = {
	date: "Nov 11/2024",
	status: "workingDay",
	availability: "available",
	from: DEFAULT_WORKING_HOURS.from,
	till: DEFAULT_WORKING_HOURS.till,
	details: "",
};

const EnableTimeSlotStatusOptions = ["workingDay", "timeoff"];

export const Timecard = () => {
	const timeCardForm = useForm<z.infer<typeof TimeCardFormValidation>>({
		resolver: zodResolver(TimeCardFormValidation),
		defaultValues: {
			status: TimeCardData.status,
			availability: TimeCardData.availability,
			from: TimeCardData.from,
			till: TimeCardData.till,
			details: TimeCardData.details,
		},
	});

	const [enableTimeSlots, setEnableTimeSlots] = useState(
		EnableTimeSlotStatusOptions.includes(TimeCardData.status)
	);

	async function handleSubmit(values: z.infer<typeof TimeCardFormValidation>) {
		console.log("values=>>", values);
	}

	const onStatusChange = (value: string) => {
		const isStatusEnable = EnableTimeSlotStatusOptions.includes(value);
		timeCardForm.setValue(
			"availability",
			isStatusEnable ? "available" : "unavailable"
		);
		setEnableTimeSlots(isStatusEnable);
	};

	const handleError = (v) => {
		console.log("err", v);
	};

	return (
		<div className="flex flex-col items-center md:items-start gap-2 w-full">
			<div className="text-md md:text-lg font-semibold ">TIMECARD</div>
			<section className="w-full">
				<Form {...timeCardForm}>
					<form
						onSubmit={timeCardForm.handleSubmit(handleSubmit, handleError)}
						className="space-y-12 rounded-md flex-1 pb-8 md:w-[400px]  border-2 p-2 md:p-6">
						<div className="font-black p-2 rounded bg-red-500 text-black">
							{TimeCardData.date}
						</div>
						<CustomFormField
							control={timeCardForm.control}
							fieldType={FormFieldType.SELECT}
							name="status"
							selectKey="value"
							optionLabel="name"
							label="Status"
							placeholder="Select Status"
							options={TimeCardStatusTypes}
							onChange={onStatusChange}
							required
						/>
						<CustomFormField
							control={timeCardForm.control}
							fieldType={FormFieldType.RADIO_GROUP}
							name="availability"
							label="Availability"
							disabled={true}
							options={AvailabilityOptions}
							required
						/>
						{enableTimeSlots ? (
							<div className="flex gap-6">
								<CustomFormField
									control={timeCardForm.control}
									fieldType={FormFieldType.TIME_PICKER}
									name="from"
									label="From"
									required
								/>
								<CustomFormField
									control={timeCardForm.control}
									fieldType={FormFieldType.TIME_PICKER}
									name="till"
									label="Till"
									required
								/>
							</div>
						) : null}
						<CustomFormField
							control={timeCardForm.control}
							fieldType={FormFieldType.TEXTAREA}
							name="details"
							label="Additional Details"
						/>
						<div className="flex justify-around">
							<Button className="w-32">Save</Button>
							<Button className="w-32" type="button" variant={"destructive"}>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</div>
	);
};
export default Timecard;
