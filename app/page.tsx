"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomFormField from "@/components/CustomFormField";
import Button from "@/components/ButtonAtom";
import { Form } from "@/components/ui/form";
import { Clients, FormFieldType, UserTypes } from "@/constants";
import { ClientSchema } from "@/features/clientapp/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function MainPage() {
	const router = useRouter();
	const form = useForm<z.infer<typeof ClientSchema>>({
		resolver: zodResolver(ClientSchema),
		defaultValues: {
			client: "",
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit(values: z.infer<typeof ClientSchema>) {
		setIsLoading(true);
		try {
			console.log("values=>>", values);
			// TODO: Save the selected value in state.
			router.push(`/patients/${values.client}/signup`);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex h-screen max-h-screen">
			<section className="container my-auto">
				<div className="sub-container max-w-[496px]">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 flex-1">
							<div className="flex gap-2">
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.SELECT}
									name="client"
									placeholder="Select a Hospital"
									options={Clients}
								/>
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.SELECT}
									name="userType"
									placeholder="Select account type"
									options={UserTypes}
								/>
							</div>
							<Button isLoading={isLoading} className="">
								Get Started
							</Button>
						</form>
					</Form>
				</div>
			</section>
		</div>
	);
}
