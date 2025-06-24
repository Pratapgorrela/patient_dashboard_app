import { useEffect, useState } from "react";
import { RenderCalendar } from "@/components/calendar/RenderCalendar";
import Timecard from "@/components/timecard/Timecard";
import { DEFAULT_WORKING_HOURS } from "@/constants";
import { getDoctorCalendar } from "../db/doctor.actions";
import DefaultTimeSlot from "@/components/DefaultTimeSlot";
import { dummyDocData } from "@/data/docData";
import { callPrefixSum } from "@/DSA/arrays/prefixSum";

export const DocCalendar = () => {
	const [docCalendarData, setDocCalendarData] =
		useState<DoctorCalendarParams | null>(null);
	// useEffect(() => {
	// 	try {
	// 		const fetchDoctors = async () => {
	// 			const data: CreateDoctorParams[] | undefined = await getDoctorsList();
	// 			console.log("data=>", data);
	// 		};
	// 		fetchDoctors();
	// 	} catch (err: unknown) {
	// 		console.log(err);
	// 	}
	// }, []);

	callPrefixSum();

	useEffect(() => {
		try {
			const fetchDocCalendarData = async () => {
				const data = await getDoctorCalendar(dummyDocData.$id);
				setDocCalendarData(data!);
				console.log(
					"data=>"
					// data?.defaultTimeSlot,
					// JSON.parse(data?.defaultTimeSlot || "")
				);
			};
			fetchDocCalendarData();
		} catch (err: unknown) {
			console.log(err);
		}
	}, []);

	return (
		<div className="mt-12 md:mt-6">
			<DefaultTimeSlot {...DEFAULT_WORKING_HOURS} />
			<div className="flex mt-6 gap-2 md:gap-6 flex-col md:flex-row">
				<RenderCalendar />
				<Timecard />
			</div>
		</div>
	);
};
