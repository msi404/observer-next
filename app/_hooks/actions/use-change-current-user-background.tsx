'use client'

import { useRef } from 'react';
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form';
import {toast} from 'sonner'
import { baseURL } from '@/app/_lib/features/apiSlice'
import {setUser} from '@/app/_lib/features/authSlice'
import { useUpdateCurrentUserMutation, useUploadFileMutation } from '@/app/_services/mutationApi'

export const useChangeCurrentUserBackground = () =>
{
	const dispatch = useDispatch()
	const [uploadFile] = useUploadFileMutation()
	const [ changeCurrentUserBackground ] = useUpdateCurrentUserMutation()
	
	const fileRef = useRef<File | null>( null );
	const form = useForm( {
		defaultValues: {
			coverImg: '',
			name: null,
			username: null,
			password: null,
			email: null,
			govCenterId: null,
			dateOfBirth: null,
			profileImg: null,
			role: null,
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
			dispatch(setUser({coverImg: form.getValues('coverImg')}))
			console.log(result, form.getValues('coverImg'));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch ( error: any )
		{
			toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
		}
	}

	return {
		onUpload,
		fileRef
	}
}