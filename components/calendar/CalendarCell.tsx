import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {
	CalendarDate,
	getLocalTimeZone,
	isSameMonth,
	isToday,
} from "@internationalized/date";
import { cn, formatDate } from "@/lib/utils";
import { CompanyHolidaysList, DocCalendarData } from "@/data/docData";

export const CalendarCell = ({
	state,
	date,
	currentMonth,
}: {
	state: CalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
}) => {
	const ref = useRef(null);
	const { isFocusVisible } = useFocusRing();
	const formatedDate = formatDate(date.toDate(getLocalTimeZone()));
	const leaves = DocCalendarData.leaves;
	const isDateToday = isToday(date, getLocalTimeZone());
	const isOutSideOfMonth = !isSameMonth(currentMonth, date);
	const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
		useCalendarCell({ date }, state, ref);
	const isDateUnavailable = [
		...CompanyHolidaysList,
		...leaves.personalLeaves,
		...leaves.weekOffs,
	].includes(formatedDate);
	const isAvailableOnEmergency = [...leaves.availabileOnEmergency].includes(
		formatedDate
	);

	return (
		<td
			{...cellProps}
			className={`p-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}>
			<div
				{...mergeProps(buttonProps, mergeProps)}
				ref={ref}
				hidden={isOutSideOfMonth}
				className="relative size-10 md:size-14 outline-none">
				<div
					className={cn(
						"size-full rounded-full flex items-center justify-center text-sm font-semibold",
						{ "bg-green-500 text-white": isSelected },
						{ "text-muted-foreground ": isDisabled },
						{
							"hover:bg-primary/10":
								!isSelected && !isDateUnavailable && !isAvailableOnEmergency,
						},
						{ "bg-[#A04747] ": isDateUnavailable },
						{ "bg-[#D8A25E] ": isAvailableOnEmergency }
					)}>
					{formattedDate}
					{isDateToday && (
						<div
							className={cn(
								"absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
								{ "bg-black": isSelected }
							)}
						/>
					)}
					{}
				</div>
			</div>
		</td>
	);
};
