import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { columns } from "./columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/features/userapp/db/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";
import { Models } from "node-appwrite";
import {
	CircleCheckBig,
	CalendarCheck2,
	TriangleAlert,
	Hourglass,
} from "lucide-react";
// import { useSession } from "next-auth/react";

const AppointmentTable = () => {
	// const { data: sessionData } = useSession();

	const [appointments, setAppointments] = useState<
		| {
				documents: Models.Document[];
				scheduledCount: number;
				pendingCount: number;
				completedCount: number;
				cancelledCount: number;
				totalCount: number;
		  }
		| undefined
	>();
	const [isLoading, setIsLoading] = useState(true);
	const [initialRenderComplete, setInitialRenderComplete] = useState(false);

	useEffect(() => {
		setInitialRenderComplete(true);
	}, []);

	useEffect(() => {
		try {
			const getAppointments = async () => {
				const appointmentsData = await getRecentAppointmentList(
					"+918886887129"
					// sessionData?.user?.phone || ""
				);
				setIsLoading(false);
				setAppointments(appointmentsData);
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			// !initialRenderComplete && sessionData?.user?.phone && getAppointments();
			!initialRenderComplete && getAppointments();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<main className="admin-main">
				<section className="w-full flex justify-center space-y-4">
					<h1 className="md:hidden header !text-lg mt-2">Appointments</h1>
				</section>
				<section className="admin-stat">
					<StatCard
						type="scheduled"
						count={appointments?.scheduledCount || 0}
						label="Scheduled appointments"
						icon={
							<CalendarCheck2
								height={32}
								width={32}
								stroke="#FFD147"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						}
					/>
					<StatCard
						type="pending"
						count={appointments?.pendingCount || 0}
						label="Pending appointments"
						icon={
							<Hourglass
								height={32}
								width={32}
								stroke="#79B5EC"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						}
					/>
					<StatCard
						type="completed"
						count={appointments?.completedCount || 0}
						label="completed appointments"
						icon={
							<CircleCheckBig
								height={32}
								width={32}
								stroke="#4AC97E"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						}
					/>
					<StatCard
						type="cancelled"
						count={appointments?.cancelledCount || 0}
						label="Cancelled appointments"
						icon={
							<TriangleAlert
								height={32}
								width={32}
								stroke="#FF4F4E"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						}
					/>
				</section>
				{initialRenderComplete && (
					<DataTable
						columns={columns}
						data={(appointments?.documents as Appointment[]) || []}
						isLoading={isLoading}
						noRecordsMessage={"No Appointments."}
					/>
				)}
			</main>
		</div>
	);
};

export default AppointmentTable;
