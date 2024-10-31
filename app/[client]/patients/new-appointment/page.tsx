import Image from "next/image";
import AppointmentForm from "@/features/userapp/components/forms/AppointmentForm";
import { getPatient } from "@/features/userapp/db/actions/patient.actions";

const user = {
	id: "6789",
	name: "pratap",
	email: "test@gamil.com",
	phone: "+918887665128",
};

export default async function NewAppointment() {
	const patient = await getPatient(user?.id);
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<Image
						src={"/assets/icons/logo-full.svg"}
						height={1000}
						width={1000}
						alt="logo"
						className="mb-12 h-10 w-fit"
					/>
					<AppointmentForm
						type="create"
						userId={user.id}
						patientId={patient?.$id}
					/>
					<p className="copyright py-12">© 2024 CarePulse</p>
				</div>
			</section>
			<Image
				src={"/assets/images/appointment-img.png"}
				height={1000}
				width={1000}
				alt="appointment"
				className="side-img max-w-[390px] bg-bottom"
			/>
		</div>
	);
}
