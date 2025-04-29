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
import {Show} from '@/app/_components/utils/show'
import { Button } from "../ui/button";

export const StatisticsCard: FC<{
	icon: ReactNode;
	total: number | string;
	description: string;
	url?: string;
}> = ({ icon, total, description, url}) => {
	return (
			<Card className="flex flex-col justify-between items-center">
			<div className="flex justify-between w-full items-center">
			<CardHeader>
				<CardTitle className="text-4xl font-bold">{total}</CardTitle>
				<CardDescription className="font-bold">{description}</CardDescription>
			</CardHeader>
			<CardContent className="text-primary">{ icon }</CardContent>
			</div>
			<Show when={ url }>
			<Link href={url!} className="w-full p-2 border-t flex items-center">
			<CardFooter className="flex mt-3 justify-between items-center w-full">
						<Button className="rounded-full w-full">
						<ArrowRight />
						<span>عرض</span>
					</Button>
			</CardFooter>
			</Link>
			</Show>
			</Card>
	);
	};


