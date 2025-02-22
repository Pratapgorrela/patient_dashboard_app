import { type ClassValue, clsx } from "clsx";
import { format, getHours, getMinutes } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
	JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDate = (value: string | Date, pattern = "dd/MM/yyyy") => {
	return format(value, pattern);
};

export const setTime = (date: Date, hours: number, minutes: number) => {
	return new Date(date.setHours(hours, minutes, 0));
};

export const getFormatedTime = (date: Date) => {
	return `${getHours(date)}:${getMinutes(date)}`;
};

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		month: "short", // abbreviated month name (e.g., 'Oct')
		day: "numeric", // numeric day of the month (e.g., '25')
		year: "numeric", // numeric year (e.g., '2023')
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const dateDayOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		year: "numeric", // numeric year (e.g., '2023')
		month: "2-digit", // abbreviated month name (e.g., 'Oct')
		day: "2-digit", // numeric day of the month (e.g., '25')
	};

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short", // abbreviated month name (e.g., 'Oct')
		year: "numeric", // numeric year (e.g., '2023')
		day: "numeric", // numeric day of the month (e.g., '25')
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const formattedDateTime: string = new Date(dateString).toLocaleString(
		"en-US",
		dateTimeOptions
	);

	const formattedDateDay: string = new Date(dateString).toLocaleString(
		"en-US",
		dateDayOptions
	);

	const formattedDate: string = new Date(dateString).toLocaleString(
		"en-US",
		dateOptions
	);

	const formattedTime: string = new Date(dateString).toLocaleString(
		"en-US",
		timeOptions
	);

	return {
		dateTime: formattedDateTime,
		dateDay: formattedDateDay,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	};
};

export function encryptKey(passkey: string) {
	return btoa(passkey);
}

export function decryptKey(passkey: string) {
	return atob(passkey);
}

export function generateRandomSixDigitNumber(): string {
	const randomNum = Math.floor(Math.random() * 1000000);
	const randomSixDigStr = randomNum.toString().padStart(6, "0");
	return randomSixDigStr;
}
