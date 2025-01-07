import { type ReactNode, type FC, Fragment} from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import {Skeleton} from '@/app/_components/ui/skeleton'

export const DataCard: FC<{
	icon: ReactNode;
	total: number;
	description: string;
	isLoading: boolean
}> = ({ icon, total, description, isLoading}) => {
	return (
		<Fragment>
		{!isLoading && <Card className="flex justify-between items-center">
			<CardHeader>
				<CardTitle className="text-3xl">{total}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="text-primary">{icon}</CardContent>
			</Card>}
			{isLoading && <Card className="flex justify-between items-center">
				<CardHeader>
					<CardTitle>
					<Skeleton className="h-6 w-6 rounded-full my-3"/>
				</CardTitle>
					<CardDescription>
						<Skeleton className="h-3 w-44"/>
				</CardDescription>
			</CardHeader>
				<CardContent>
					<Skeleton className="w-10 h-10 rounded-full"/>
			</CardContent>
    </Card>}
		</Fragment>
	);
	};


