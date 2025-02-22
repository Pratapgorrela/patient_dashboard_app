import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import Button from "@/components/ButtonAtom";
import { getFormatedTime } from "@/lib/utils";
import { DefaultTimeFormValidation } from "./validations";

interface DefaultTimeSlotProps {
	from: Date;
	till: Date;
}

const DefaultTimeSlot = ({ from, till }: DefaultTimeSlotProps) => {
	const form = useForm<z.infer<typeof DefaultTimeFormValidation>>({
		resolver: zodResolver(DefaultTimeFormValidation),
		defaultValues: { from, till },
	});
	const formData = form.getValues();

	const onSubmit = (values: z.infer<typeof DefaultTimeFormValidation>) => {
		const from = getFormatedTime(values.from);
		const till = getFormatedTime(values.till);
		console.log(from, till);
	};

	const handleError = (err) => {
		console.log("err", err);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, handleError)}>
				<div className="flex gap-6 w-fit rounded-md border p-2 items-center justify-around flex-col md:flex-row">
					<label className="w-full font-semibold text-lg">
						DEFAULT WORKING HOURS :{" "}
					</label>
					<div className="flex gap-2 items-center">
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.TIME_PICKER}
							name="from"
							required
							showErrors={false}
							errors={form.formState.errors}
							placeholder="Select start time"
							className="!w-fit"
							{...(formData.till && {
								minTime: new Date(new Date().setHours(0, 0, 0)),
								maxTime: formData.till,
							})}
						/>
						{"-"}
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.TIME_PICKER}
							name="till"
							required
							showErrors={false}
							errors={form.formState.errors}
							placeholder="Select end time"
							className="!w-fit"
							{...(formData.from && {
								minTime: formData.from,
								maxTime: new Date(new Date().setHours(23, 30, 0)),
							})}
						/>
						<Button className="w-32 ml-3">Update</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
export default DefaultTimeSlot;
