import { type FC} from "react";
import {motion} from 'motion/react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card"
import {CloudAlert, RefreshCcw} from 'lucide-react'

export const ErrorCard: FC<{retry: () => void}> = ({retry}) => {
	return (
			<Card className="flex justify-between items-center">
			<CardHeader>
				<CardTitle className="text-3xl">
					<span>خطأ</span>
					<motion.button
						onClick={retry}
				  whileHover={{
					 scale: 1.1,
					 transition: {
						damping: 0,
						ease: 'linear',
						duration: 0.2
					 }
				  }}
				  className="bg-slate-200 p-1 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
					>
						<RefreshCcw />
				</motion.button>
				</CardTitle>
				<CardDescription>يبدو ان هناك خطأ في تحميل البيانات</CardDescription>
			</CardHeader>
			<CardContent className="text-primary">
				<CloudAlert color="red"/>
			</CardContent>
			</Card>
	);
	};


