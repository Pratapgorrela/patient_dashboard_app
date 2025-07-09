/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { useEffect, useState } from "react";
import { UserSignupFormValidation } from "@/features/userapp/types/validation";
import { redirect, useRouter } from "next/navigation";
// import { handleCredentialsSignIn } from "@/lib/actions/auth.actions";
import { ERRORS, FormFieldType } from "@/constants";
import { getIcons, ICON_NAMES } from "@/lib/service";
import PasskeyModal from "@/components/PasskeyModal";
import {
	createUser,
	createUserSession,
	generatePhoneToken,
} from "@/lib/actions/common.actions";
import { IUser } from "@/types/user";
import { useConfigStore } from "@/store/configStore";
import { account } from "@/models/client/config";
import { useAuthStore } from "@/store/userAuthStore";

const PatientSignupForm = () => {
	const router = useRouter();
	const {
		routeConfig: { client, userType },
	} = useConfigStore();
	const { setAuthData, user } = useAuthStore();

	useEffect(() => {
		if (user?.$id) {
			redirect(`/${client}/${userType}/dashboard`);
		}
	}, [user]);

	const [isLoading, setIsLoading] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [userData, setUserData] = useState<IUser | null>({
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

	const sendPhoneToken = async (
		values: z.infer<typeof UserSignupFormValidation>
	) => {
		//STEP-2: Send OTP to user phone number.
		const registeredData = await generatePhoneToken(values.phone);
		if (registeredData && registeredData?.["userId"]) {
			setUserId(registeredData?.["userId"] as string);
			setUserData(values);
			setIsLoading(false);
		} else setError(SIGNUP_ERRORS.UNKNOWN_ERR);
	};

	async function onSubmit(values: z.infer<typeof UserSignupFormValidation>) {
		setError("");
		setUserId(null);
		setUserData(null);
		setIsLoading(true);
		try {
			const createdUserInfo = await createUser(values);
			console.log("createdUserInfo=>>", createdUserInfo);
			if (
				createdUserInfo &&
				(!createdUserInfo?.error || !createdUserInfo?.phoneVerification)
			) {
				// User account is not available or not verified.
				await sendPhoneToken(values);
			} else if (createdUserInfo?.error) {
				// Something went wrong.
				setError(
					createdUserInfo?.error
						? createdUserInfo?.error
						: SIGNUP_ERRORS.UNKNOWN_ERR
				);
			} else if (createdUserInfo && createdUserInfo?.phoneVerification) {
				// User account is already available and verified.
				setError(SIGNUP_ERRORS.USER_EXIST);
			} else setError(SIGNUP_ERRORS.UNKNOWN_ERR);
		} catch (error) {
			setUserId(null);
			setUserData(null);
			setError(SIGNUP_ERRORS.UNKNOWN_ERR);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const validatePasskey = async (passkey: string) => {
		if (userId && passkey && userData) {
			// STEP-3: Verify OTP.
			const userSession = await createUserSession(userId, passkey);
			console.log("userSession=>>", userSession);
			if (!userSession) {
				setError(SIGNUP_ERRORS.UNKNOWN_ERR);
				return SIGNUP_ERRORS.UNKNOWN_ERR;
			}
			// TODO: Create record for sign-up user into respective collection using the userID.
			// TODO: Initiate role creation.
			const user = await account.get();
			if (user?.$id && userSession) {
				setAuthData({ session: userSession, user });
				// await setTeamAndMemberships(user?.$id);

				// // Get patient Data using userId.
				// const patient: any = await getPatient(token.userId);
				// console.log("patient=>>", patient);

				return "Success";
			}
			return SIGNUP_ERRORS.UNKNOWN_ERR;
		}
		return SIGNUP_ERRORS.INVALID_OTP;
	};

	const handleLogin = () => {
		router.push(`/${client}/${userType}/login`);
	};

	return (
		<>
			{/* {userId && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					redirectUrl={`/${client}/${userType}/dashboard`}
					title="Signup Verification"
				/>
			)} */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1"
				>
					<section className="mb-12 space-y-4">
						<h1 className="header">Welcome 👋</h1>
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
						type="button"
					>
						{`Already have a account? `}
						<b>Login</b>
					</Button>
					<Button
						onClick={() => router.push(`/${client}/${userType}/appointment`)}
						variant={"default"}
						className="!bg-blue-500"
					>
						Book a New Appointment
					</Button>
				</form>
			</Form>
		</>
	);
};

export default PatientSignupForm;
