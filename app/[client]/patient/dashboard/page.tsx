import { PatientDashboard } from "@/features/userapp/components/PatientDashboard";
import { cookies } from "next/headers";

const setSession = async () => {
	"use server";

	cookies().set({ name: "appwrite-session", value: "123456" });
};

export default async function PatientDashboardPage() {
	setSession();
	return (
		<div className="flex h-screen max-h-screen">
			<PatientDashboard />
		</div>
	);
}
