"use client";

import { useState } from "react";
import { Calendar } from "./Calendar";
import {
	today,
	getLocalTimeZone,
	DateValue,
	CalendarDate,
} from "@internationalized/date";

export const RenderCalendar = () => {
	const [date, setDate] = useState(today(getLocalTimeZone()));

	// const isDateUnavailable = (date: DateValue) => {
	// const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
	// const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
	// return !availability?.[adjustedIndex]?.isActive;
	// };

	const handleDateChange = (date: DateValue) => {
		setDate(date as CalendarDate);
	};

	return (
		<div className="flex flex-col items-center md:items-start gap-2 w-full">
			<div className="text-md md:text-lg font-semibold">CALENDAR</div>
			<Calendar
				minValue={today(getLocalTimeZone())}
				value={date}
				onChange={handleDateChange}
			/>
		</div>
	);
};
