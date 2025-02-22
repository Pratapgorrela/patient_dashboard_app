"use client";

import { CalendarProps, DateValue, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

export const Calendar = (
	props: CalendarProps<DateValue> & {
		isDateUnavailable?: (date: DateValue) => boolean;
	}
) => {
	const { locale } = useLocale();
	const state = useCalendarState({
		...props,
		visibleDuration: { months: 1 },
		locale,
		createCalendar,
	});

	const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
		props,
		state
	);

	return (
		<div
			{...calendarProps}
			className="inline-block w-full min-w-full border-2 p-2 md:p-6 ">
			<CalendarHeader
				state={state}
				calendarProps={calendarProps}
				prevButtonProps={prevButtonProps}
				nextButtonProps={nextButtonProps}
			/>
			<div className="flex gap-2 md:gap-8">
				<CalendarGrid state={state} />
			</div>
		</div>
	);
};
