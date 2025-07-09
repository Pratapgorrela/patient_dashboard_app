/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { UserLoginFormValidation } from "@/features/userapp/types/validation";
import { ERRORS, FormFieldType } from "@/constants";
import { Models } from "node-appwrite";
import { redirect, useRouter } from "next/navigation";
import {
	createUserSession,
	createUserSessionByEmail,
	generatePhoneToken,
	getUserByPhone,
	getUserTeamsAndMemberships,
} from "@/lib/actions/common.actions";
import { account } from "@/models/client/config";
import { useAuthStore } from "@/store/userAuthStore";
import { useConfigStore } from "@/store/configStore";
import PasskeyModal from "@/components/PasskeyModal";

const PatientLoginForm = () => {
	const router = useRouter();
	const { setAuthData, setTeamsAndMemberhips, user } = useAuthStore();
	const {
		routeConfig: { client, userType },
	} = useConfigStore();

	useEffect(() => {
		if (user?.$id) {
			redirect(`/${client}/${userType}/dashboard`);
		}
	}, [user]);

	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState<Models.Session | null>(null);
	const [error, setError] = useState("");

	const LOGIN_ERRORS = { ...ERRORS.GLOBAL, ...ERRORS.LOGIN };

	const form = useForm<z.infer<typeof UserLoginFormValidation>>({
		resolver: zodResolver(UserLoginFormValidation),
		defaultValues: {
			phone: "",
		},
	});

	const sendPhoneToken = async (
		values: z.infer<typeof UserLoginFormValidation>
	) => {
		//STEP-2: Send OTP to user phone number.
		const tokenData: Models.Session = (await generatePhoneToken(
			values.phone
		)) as Models.Session;
		if (tokenData && tokenData?.userId) {
			setToken(tokenData);
			setIsLoading(false);
		} else setError(LOGIN_ERRORS.UNKNOWN_ERR);
	};

	const initiatePhoneLogin = async (
		values: z.infer<typeof UserLoginFormValidation>
	) => {
		setError("");
		setToken(null);
		setIsLoading(true);
		try {
			// Check user phone is already registered.
			const userData = await getUserByPhone(values.phone);
			if (userData && userData?.phoneVerification) {
				// User account is existed and verified.
				await sendPhoneToken(values);
			} else {
				// User account is either not existed or not verified.
				setError(LOGIN_ERRORS.USER_NOT_EXIST);
			}
		} catch (error) {
			setToken(null);
			setError(LOGIN_ERRORS.UNKNOWN_ERR);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	async function setTeamAndMemberships(userId: string) {
		const res = await getUserTeamsAndMemberships(userId);
		setTeamsAndMemberhips(res);
	}

	// Use this for testing purpose.
	const initiatePasswordLogin = async () => {
		setError("");
		setToken(null);
		setIsLoading(true);
		try {
			const session = await createUserSessionByEmail();
			const user = await account.get();
			// const [user, { jwt }] = await Promise.all([
			// 	account.get(),
			// 	account.createJWT(),
			// ]);
			// account.deleteSession("current");
			// console.log("userSession=>>", session, user);

			if (user?.$id && session) {
				setAuthData({ session, user });
				setToken(session);
				await setTeamAndMemberships(user?.$id);
				router.push(`/${client}/${userType}/dashboard`);
			}
		} catch (error) {
			setToken(null);
			setError(LOGIN_ERRORS.UNKNOWN_ERR);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	async function onSubmit(values: z.infer<typeof UserLoginFormValidation>) {
		// await initiatePhoneLogin(values);
		await initiatePasswordLogin();
	}

	const validatePasskey = async (passkey: string) => {
		if (passkey && token?.userId) {
			const session = await createUserSession(token.userId, passkey);
			console.log("session=>>", session);
			if (session) {
				const user = await account.get();
				if (user?.$id && session) {
					setAuthData({ session, user });
					setToken(session);
					await setTeamAndMemberships(user?.$id);

					// // Get patient Data using userId.
					// const patient: any = await getPatient(token.userId);
					// console.log("patient=>>", patient);

					return "Success";
				}
				return LOGIN_ERRORS.UNKNOWN_ERR;
			}
			return LOGIN_ERRORS.UNKNOWN_ERR;
		}
		return LOGIN_ERRORS.INVALID_OTP;
	};

	const handleSignup = () => {
		router.push(`/${client}/${userType}/signup`);
	};

	return (
		<div>
			{/* {token?.userId && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					redirectUrl={`/${client}/${userType}/dashboard`}
				/>
			)} */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1"
				>
					<section className="mb-12 space-y-4">
						<h1 className="header">Hi there 👋</h1>
						<p className="text-dark-700">Login to schedule your appointment.</p>
					</section>

					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.PHONE_INPUT}
						name="phone"
						label="Phone number"
						placeholder="123 456 7890"
						onChange={() => setError("")}
						required
					/>
					<div className="text-red-500">{error}</div>
					<Button isLoading={isLoading}>Login</Button>
					<Button
						variant="ghost"
						className="shad-gray-btn"
						type="button"
						onClick={handleSignup}
					>
						{`Don't have a account? `}
						<b>Sign Up</b>
					</Button>
					<Button
						onClick={() => router.push(`/${client}/${userType}/appointment`)}
						variant={"default"}
						type="button"
						className="!bg-blue-500"
					>
						Book a New Appointment
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PatientLoginForm;
