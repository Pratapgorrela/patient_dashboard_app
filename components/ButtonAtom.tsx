import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
	isLoading?: boolean;
	className?: string;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
}

const ButtonAtom = ({
	isLoading = false,
	children,
	className = "",
	type = "submit",
	onClick = () => null,
}: ButtonProps) => {
	return (
		<Button
			type={type}
			disabled={isLoading}
			className={cn("shad-primary-btn w-full", className)}
			onClick={onClick}>
			{isLoading ? (
				<div className="flex items-center gap-4">
					<Image
						src={"/assets/icons/loader.svg"}
						alt="loader"
						width={24}
						height={24}
						className="animate-spin"
					/>
					Loading...
				</div>
			) : (
				children
			)}
		</Button>
	);
};

export default ButtonAtom;
