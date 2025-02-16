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

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

// API Services
import { baseURL } from '@/app/_services/api';
import {
  useUsersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateUserMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addProvinceAdminSchema } from '@/app/_validation/user';

export const useAddProvinceAdmin = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingProvinceAdmin }] =
    useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addProvinceAdminSchema>>({
    resolver: zodResolver(addProvinceAdminSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      profileImg: '',
      phone: '',
      email: '',
      password: '',
      role: 12
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
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
        addProvinceAdminSchema.parse(form.getValues())
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
    isLoadingFile,
    isLoadingProvinceAdmin,
    fileRef
  };
};
