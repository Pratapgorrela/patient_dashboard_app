import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { columns } from "./columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/features/userapp/db/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";
import { Models } from "node-appwrite";

const AppointmentTable = () => {
	const [appointments, setAppointments] = useState<
		| {
				documents: Models.Document[];
				scheduledCount: number;
				pendingCount: number;
				cancelledCount: number;
				totalCount: number;
		  }
		| undefined
	>();

	useEffect(() => {
		async function getAppointments() {
			const appointmentsData = await getRecentAppointmentList();
			setAppointments(appointmentsData);
		}
		getAppointments();
	}, []);

	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<main className="admin-main">
				<section className="w-full flex justify-center space-y-4">
					<h1 className="md:hidden header">Appointments</h1>
				</section>
				<section className="admin-stat">
					<StatCard
						type="appointments"
						count={appointments?.scheduledCount || 0}
						label="Completed appointments"
						icon="/assets/icons/appointments.svg"
					/>
					<StatCard
						type="pending"
						count={appointments?.pendingCount || 0}
						label="Pending appointments"
						icon="/assets/icons/pending.svg"
					/>
					<StatCard
						type="cancelled"
						count={appointments?.cancelledCount || 0}
						label="Cancelled appointments"
						icon="/assets/icons/cancelled.svg"
					/>
				</section>
				<DataTable
					columns={columns}
					data={(appointments?.documents as Appointment[]) || []}
				/>
			</main>
		</div>
	);
};

export default AppointmentTable;
