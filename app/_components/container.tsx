import { type ReactNode, type FC } from "react";
import { cn } from "@/app/_lib/utils";
export const Container: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("container mx-auto px-4", className)}>
			{children}
		</div>
	);
};
