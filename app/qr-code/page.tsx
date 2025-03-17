'use client';
import { Scanner } from "@yudiel/react-qr-scanner";
import { Container } from '@/app/_components/containers/container';
import { useToast } from '@/app/_hooks/use-toast';
export default function Scan ()
{
	const { toast } = useToast();
	return (
		<Container>
			<div className="flex flex-col mt-5 justify-center items-center">
				<h1 className="text-4xl font-bold mb-4">قارئ باردكود</h1>
				<div>
					<Scanner
						onError={ () => toast( {
							title: 'خطأ',
							description: 'يجب ان تسمح للتطبيق للوصول الى الكاميرا.',
							variant: 'destructive'
						} ) }
						allowMultiple
						onScan={ ( res ) => console.log( res ) } />
				</div>
			</div>
		</Container>
	);
}