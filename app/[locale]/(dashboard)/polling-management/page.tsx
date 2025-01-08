import { Container } from "@/app/_components/container";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import {Editor} from '@/app/_components/editor'
const PollingManagementPage = () => {
	return (
		<Container>
			<Card className="p-4">
				<CardContent className="flex flex-col md:flex-row gap-5 justify-between">
					<Input
						className="lg:w-1/2"
						type="text"
						placeholder="البحث عن مدير الحالة"
					/>
				</CardContent>
				<CardContent>
					<Editor />
				</CardContent>
			</Card>
		</Container>
	);
};

export default PollingManagementPage;
