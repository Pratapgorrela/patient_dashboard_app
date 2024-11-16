import { Skeleton } from "../ui/skeleton";

const RegistrationSkeleton = () => {
	return (
		<div className="flex flex-col gap-3 mt-9">
			{[1, 2, 3].map((key) => (
				<div key={key} className="flex flex-col h-[300px] gap-5">
					<Skeleton className="h-28" />
					<div className="flex gap-6">
						<Skeleton className="h-14 w-full" />
						<Skeleton className="h-14 w-full" />
					</div>
					<div className="flex gap-6">
						<Skeleton className="h-14 w-full" />
						<Skeleton className="h-14 w-full" />
					</div>
				</div>
			))}
		</div>
	);
};
export default RegistrationSkeleton;
