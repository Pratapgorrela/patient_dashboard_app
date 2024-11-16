"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { useState } from "react";
import { UserSignupFormValidation } from "@/features/userapp/types/validation";
import {
	createUser,
	getUserByPhone,
} from "@/features/userapp/db/actions/patient.actions";
import { useRouter } from "next/navigation";
import { handleCredentialsSignIn } from "@/lib/actions/auth.actions";
import { ERRORS, FormFieldType } from "@/constants";
import { getIcons, ICON_NAMES } from "@/lib/service";
import PasskeyModal from "@/components/PasskeyModal";
// import { sendOTPToUser } from "@/lib/actions/common.actions";

const PatientSignupForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [userData, setUserData] = useState<CreateUserParams>({
		name: "",
		phone: "",
		email: "",
	});

	const icons = getIcons([ICON_NAMES.user, ICON_NAMES.email]);

	const SIGNUP_ERRORS = { ...ERRORS.GLOBAL, ...ERRORS.SIGNUP };

	const form = useForm<z.infer<typeof UserSignupFormValidation>>({
		resolver: zodResolver(UserSignupFormValidation),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof UserSignupFormValidation>) {
		setError("");
		setToken(null);
		setIsLoading(true);
		try {
			// STEP-1: Check user phone is already registered.
			const userData = await getUserByPhone(values.phone);
			console.log("userData=>>", userData);
			if (userData) {
				setError(SIGNUP_ERRORS.USER_EXIST);
				setIsLoading(false);
				return;
			}

			//STEP-2: Send OTP to user phone number.
			// TODO: Integrate actual API end point to send OTP.
			// await sendOTPToUser(values.phone);
			setToken("123321");

			setUserData(values);
			setIsLoading(false);
		} catch (error) {
			setToken(null);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const validatePasskey = async (passkey: string) => {
		// STEP-3: Verify OTP.
		if (token && passkey === token) {
			const user = await createUser(userData);
			if (!user) {
				setError(SIGNUP_ERRORS.UNKNOWN_ERR);
				return "Success";
			}
			await handleCredentialsSignIn({ ...user, $id: "", userId: user?.$id });

			// TODO: Success Alert.
			return "Success";
		}
		return SIGNUP_ERRORS.INVALID_OTP;
	};

	const handleLogin = () => {
		router.push(`/fortis/patient/login`);
	};

	return (
		<>
			{/* <form action={handleSignOut}>
				<Button onClick={handleSignOut}>SignOut</Button>
			</form> */}
			{token && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					redirectUrl="/fortis/patient/dashboard"
					title="Signup Verification"
				/>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1">
					<section className="mb-12 space-y-4">
						<h1 className="header">Hi there 👋</h1>
						<p className="text-dark-700">
							Signup to Schedule your first appointment.
						</p>
					</section>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="name"
						label="Full name"
						placeholder="Full name"
						icon={icons?.[ICON_NAMES.user]}
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						required
					/>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.INPUT}
						name="email"
						label="Email"
						placeholder="Email"
						icon={icons?.[ICON_NAMES.email]}
					/>
					<div className="text-red-500">{error}</div>
					<Button isLoading={isLoading}>Get Started</Button>
					<Button
						variant="ghost"
						className="shad-gray-btn"
						onClick={handleLogin}
						type="button">
						{`Already have a account? `}
						<b>Login</b>
					</Button>
					<Button
						onClick={() => router.push(`/fortis/patient/appointment`)}
						variant={"default"}
						className="!bg-blue-500">
						Book a New Appointment
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PatientSignupForm;
