"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ButtonAtom";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UserOtpValidation } from "./validations";
import { useRouter } from "next/navigation";
import { getIcon, ICON_NAMES } from "@/lib/service";

const PasskeyModal = ({
	validatePasskey,
	redirectUrl,
	title = "",
	onSuccess,
	onClose,
}: {
	validatePasskey: (passkey: string) => Promise<string>;
	redirectUrl?: string;
	title?: string;
	onSuccess?: () => void;
	onClose?: () => void;
}) => {
	const router = useRouter();

	const [open, setOpen] = useState(true);
	const [error, setError] = useState("");

	const closeModal = () => {
		setOpen(false);
		onClose?.();
	};

	const closeIcon = getIcon(ICON_NAMES.close, {
		onClick: closeModal,
		className: "cursor-pointer",
	});

	const form = useForm<z.infer<typeof UserOtpValidation>>({
		resolver: zodResolver(UserOtpValidation),
		defaultValues: {
			passkey: "",
		},
	});

	async function onSubmit(data: z.infer<typeof UserOtpValidation>) {
		setError("");
		const response = await validatePasskey(data.passkey);
		if (response === "Success") {
			setOpen(false);
			onSuccess?.();
			if (redirectUrl) router.push(redirectUrl);
		} else {
			setError(response);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className="shad-alert-dialog">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-start justify-between">
						{title || "Login Access Verification"}
						{closeIcon}
					</AlertDialogTitle>
					<AlertDialogDescription>
						Please enter the one-time password sent to your phone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="passkey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>One-Time Password</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field} autoFocus>
											<InputOTPGroup className="shad-otp flex gap-2">
												<InputOTPSlot index={0} className="shad-otp-slot" />
												<InputOTPSlot index={1} className="shad-otp-slot" />
												<InputOTPSlot index={2} className="shad-otp-slot" />
												<InputOTPSlot index={3} className="shad-otp-slot" />
												<InputOTPSlot index={4} className="shad-otp-slot" />
												<InputOTPSlot index={5} className="shad-otp-slot" />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{error && (
							<p className="shad-error text-14-regular mt-4 flex justify-center">
								{error}
							</p>
						)}
						<Button>Submit</Button>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default PasskeyModal;
