import { type ReactNode, type FC} from "react";
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter
} from "@/app/_components/ui/card";
import {Show} from '@/app/_components/show'

export const StatisticsCard: FC<{
	icon: ReactNode;
	total: number;
	description: string;
	url?: string;
}> = ({ icon, total, description, url}) => {
	return (
			<Card className="flex flex-col justify-between items-center">
			<div className="flex justify-between items-center">
			<CardHeader>
				<CardTitle className="text-3xl">{total}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="text-primary">{ icon }</CardContent>
			</div>
			<Show when={url}>
			<Link href={url} className="w-full p-2 border flex items-center">
			<CardFooter className="flex justify-between items-center w-full">
					<ArrowRight />
				<span>عرض الصفحة</span>
			</CardFooter>
			</Link>
			</Show>
			</Card>
	);
	};


