'use client';
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import {useSendQrCodeMutation} from '@/app/_services/mutationApi'
import { Container } from '@/app/_components/containers/container';
import {toast} from 'sonner'
export default function Scan ()
{
	const [ sendQrCode ] = useSendQrCodeMutation()

	const onScan = async (detectedCodes: IDetectedBarcode[]) =>
	{
		await sendQrCode( { data: detectedCodes.at( 0 )?.rawValue } )
		toast.message('تم', {
			description: 'تم ارسال البيانات بنجاح.',
		} ) 
	}
	return (
		<Container>
			<div className="flex flex-col mt-5 justify-center items-center">
				<h1 className="text-4xl font-bold mb-4">قارئ باردكود</h1>
				<div>
					<Scanner
						onError={ () => toast.error('يجب ان تسمح للتطبيق للوصول الى الكاميرا.') }
						components={{onOff: true}}
						onScan={(detectedCodes: IDetectedBarcode[]) => onScan(detectedCodes)} />
				</div>
			</div>
		</Container>
	);
}