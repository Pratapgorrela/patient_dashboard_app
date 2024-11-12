import clsx from "clsx";
import { ReactNode } from "react";

interface StatCardProps {
	type: "scheduled" | "pending" | "cancelled" | "completed";
	count: number;
	label: string;
	icon: ReactNode;
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
	return (
		<div
			className={clsx("stat-card", {
				"bg-scheduled": type === "scheduled",
				"bg-pending": type === "pending",
				"bg-completed": type === "completed",
				"bg-cancelled": type === "cancelled",
			})}>
			<div className="flex items-center gap-4">
				{icon}
				<h2 className="text-32-bold text-white">{count}</h2>
			</div>
			<p className="texr-14-regular">{label}</p>
		</div>
	);
};

export default StatCard;
