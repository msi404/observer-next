import { type ReactNode, type FC} from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";

export const DataCard: FC<{
	icon: ReactNode;
	total: number;
	description: string;
}> = ({ icon, total, description}) => {
	return (
		<Card className="flex justify-between items-center">
			<CardHeader>
				<CardTitle className="text-3xl">{total}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="text-primary">{icon}</CardContent>
			</Card>
	);
	};


