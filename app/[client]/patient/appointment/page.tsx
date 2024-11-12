import Image from "next/image";
import AppointmentForm from "@/features/userapp/components/forms/AppointmentForm";
import { auth } from "@/auth";
import { getAppointment } from "@/features/userapp/db/actions/appointment.actions";
import { AppointmentActionsType } from "@/constants";

export const revalidate = 0;
export default async function NewAppointment({
	searchParams,
}: SearchParamProps) {
	const appointmentId = (searchParams?.appointmentId as string) || "";
	const appointment = appointmentId
		? await getAppointment(appointmentId)
		: null;
	const session = await auth();

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
						type={
							appointment
								? AppointmentActionsType.UPDATE.key
								: AppointmentActionsType.CREATE.key
						}
						user={session?.user}
						appointment={appointment}
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
