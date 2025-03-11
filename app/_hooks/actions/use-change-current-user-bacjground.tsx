'use client'

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/app/_hooks/use-toast';
import {baseURL} from '@/app/_lib/features/apiSlice'
import { usePatchCurrentUserMutation, useUploadFileMutation } from '@/app/_services/mutationApi'

export const useChangeCurrentUserBackground = () =>
{
	const [uploadFile] = useUploadFileMutation()
	const [ changeCurrentUserBackground ] = usePatchCurrentUserMutation()
	
	const fileRef = useRef<File | null>( null );
	const { toast } = useToast();

	const form = useForm( {
		defaultValues: {
			coverImg: ''
		}
	})
	
	const onUpload = async () =>
	{
		try
		{
			const formData = new FormData()
			formData.append( 'file', fileRef.current as File )
			const response = await uploadFile( formData ).unwrap()
			form.setValue( 'coverImg', `${ baseURL }/${ response?.data }` )
			const result = await changeCurrentUserBackground( { user: form.getValues() } ).unwrap()
			console.log(result);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch ( error: any )
		{
			toast({
				title: 'Error',
				description: error.data?.msg || 'An unexpected error occurred',
				variant: 'destructive'
			 });
		}
	}

	return {
		onUpload,
		fileRef
	}
}