import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { Skeleton } from '@/app/_components/ui/skeleton'

export const CardSkeleton = () =>
{
	return (
		<Card className="flex justify-between items-center">
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
</Card>
	)
}