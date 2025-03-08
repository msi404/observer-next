/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  useUploadFileMutation,
  useUpdateComplaintMutation
} from '@/app/_services/mutationApi';
import { useComplaintsQuery } from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editComplaintSchema } from '@/app/_validation/complaint';
import { baseURL } from '@/app/_services/api';

export const useEditComplaint = () => {
  // API Mutations & Queries
  const [updateComplaint, { isLoading: isLoadingUpdate }] =
    useUpdateComplaintMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const user = useSelector(selectUser);
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&CreatorElectoralEntityId=${electoralEntityId}`
      : '';
  const { refetch } = useComplaintsQuery(electoralEntityIdQuery);

  // State Management
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  // Refs
	const fileRef = useRef<File | null>( null );
	
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof editComplaintSchema>>({
    resolver: zodResolver(editComplaintSchema),
    defaultValues: {
      replierId: user.id!,
      title: '',
      content: '',
      img: '',
      reply: ''
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
   if (!fileRef.current) {
			toast({
			  title: 'لايوجد صورة',
			  description: 'يجب ان ترفع صورة',
			  variant: 'destructive'
			});
			return;
		 }
		 try {
			const formData = new FormData();
			formData.append('file', fileRef.current as File);
	
			const response = await uploadFile(formData).unwrap();
			form.setValue('img', `${baseURL}/${response?.data}`);
			const result = await updateComplaint(
			  editComplaintSchema.parse(form.getValues())
			).unwrap();
	
			console.log(result);
		 } catch (error: any) {
			toast({
			  title: 'Error',
			  description: error.data.title,
			  variant: 'destructive'
			});
		 } finally {
			refetch();
			setOpenUpdate(false);
		 }
  };


  return {
    openUpdate,
    setOpenUpdate,
    onUpdate,
    isLoadingUpdate,
    form,
    isLoadingFile,
    fileRef
  };
};
