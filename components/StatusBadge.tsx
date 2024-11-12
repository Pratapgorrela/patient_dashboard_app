import clsx from "clsx";
import {
	CalendarCheck2,
	CircleCheckBig,
	Hourglass,
	TriangleAlert,
} from "lucide-react";

const StatusBadge = ({ status }: { status: Status }) => {
	const getStatusIcon = (iconName: string) => {
		switch (iconName) {
			case "scheduled":
				return <CalendarCheck2 height={16} width={16} />;
			case "pending":
				return <Hourglass height={16} width={16} />;
			case "completed":
				return <CircleCheckBig height={16} width={16} />;
			case "cancelled":
				return <TriangleAlert height={16} width={16} />;
			default:
				return <></>;
		}
	};
	return (
		<div
			className={clsx("status-badge !w-36", {
				"bg-blue-600": status === "pending",
				"bg-yellow-800": status === "scheduled",
				"bg-green-600": status === "completed",
				"bg-red-600": status === "cancelled",
			})}>
			{getStatusIcon(status)}
			<p className={clsx("text-12-semibold capitalize")}>{status}</p>
		</div>
	);
};

export default StatusBadge;
