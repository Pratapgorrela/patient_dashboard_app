import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
	isLoading?: boolean;
	className?: string;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| null
		| undefined;
	disabeld?: boolean;
}

const ButtonAtom = ({
	isLoading = false,
	children,
	className = "",
	type = "submit",
	onClick = () => null,
	variant = "secondary",
	disabeld = false,
}: ButtonProps) => {
	return (
		<Button
			type={type}
			disabled={disabeld || isLoading}
			className={cn(
				{ "shad-primary-btn": variant === "secondary" },
				"w-full text-base",
				className
			)}
			onClick={onClick}
			variant={variant}>
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
