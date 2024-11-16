"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { app_constants } from "@/constants/config";

const AlertNote = ({
	open,
	setIsopen,
	headerLabel = "",
	description = "",
	colour,
	icon,
}: {
	open: boolean;
	setIsopen: (value: boolean) => void;
	description?: string;
	headerLabel?: string;
	colour?: string;
	icon?: any;
}) => {
	const { DEFAULT_ALERT_CONFIG } = app_constants;
	const fillColour = colour || DEFAULT_ALERT_CONFIG.colour;
	const AlertIcon = icon || DEFAULT_ALERT_CONFIG.icon;

	return app_constants ? (
		<AlertDialog open={open}>
			<AlertDialogContent className="flex flex-col items-center gap-4 md:gap-8 bg-gray-100 w-56 md:w-fit">
				<AlertDialogHeader className="gap-2">
					<AlertDialogTitle className="self-center flex flex-col items-center">
						<AlertIcon
							height={32}
							width={32}
							fill={fillColour}
							className="md:w-20 md:h-20"
						/>
						<div className={`md:text-xl text-[${fillColour}] font-bold`}>
							{headerLabel || DEFAULT_ALERT_CONFIG.headerLabel}
						</div>
					</AlertDialogTitle>
					<AlertDialogDescription className="md:text-lg text-black font-normal">
						{description || DEFAULT_ALERT_CONFIG.description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={() => setIsopen(false)}
						className={`bg-[${fillColour}] hover:bg-[${fillColour}] text-base rounded-sm md:size-12  md:!w-28 md:p-4`}>
						Ok
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	) : null;
};
export default AlertNote;
