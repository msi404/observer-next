'use client';

import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// API Services
import { baseURL } from '@/app/_services/api';

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

import {
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation, useUploadFileMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addObserverSchema } from '@/app/_validation/user';

export const useAddObserver = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useUsersQuery(
    `Role=104&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
  
    // Refs
    const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addObserverSchema>>({
    resolver: zodResolver(addObserverSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      birth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      profileImg: '',
      email: '',
      password: '',
      role: 104
    }
  });

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addObserverSchema>) => {
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
         form.setValue('profileImg', `${baseURL}/${response?.data}`);
         const result = await createUser(
           addObserverSchema.parse(form.getValues())
         ).unwrap();
   
         console.log(result);
       } catch (error: any) {
         toast({
           title: 'Error',
           description: error.data,
           variant: 'destructive'
         });
         console.log(error);
       } finally {
         refetch();
         setOpenAdd(false);
       }
  };
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    isLoadingFile,
    fileRef
  };
};
