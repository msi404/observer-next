import { Card, CardContent } from "@/app/_components/ui/card";
import { Skeleton } from '@/app/_components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/_components/ui/table";
import { Container } from "@/app/_components/container";

const Loading = () => {
	
	return (
		<Container>
			<Card className="p-4">
				<CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
					<div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
						<Skeleton className="h-8 w-full"/>
						<Skeleton className="h-9 px-4 py-2 w-full lg:w-24"/>
					</div>
				</CardContent>
				<Container>
					<Table>
						<TableHeader>
							<TableRow>
								{ Array.from( { length: 4 } ).map( () => (
								<TableHead>
								<Skeleton className="h-4 w-16"/>
							</TableHead>
							))}
							</TableRow>
						</TableHeader>
						<TableBody>
						{ Array.from( { length: 10 } ).map( () => (
								<TableRow>
								{ Array.from( { length: 4 } ).map( () => (
									<TableCell>
										<Skeleton className="h-5 w-20"/>
								</TableCell>
							))}
							</TableRow>
							))}
						</TableBody>
					</Table>
					<Skeleton className="w-full h-8 mt-12"/>
				</Container>
			</Card>
		</Container>
	);
};

export default Loading;
