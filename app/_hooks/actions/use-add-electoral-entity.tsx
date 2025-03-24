/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {toast} from 'sonner'

// API Services
import { baseURL } from '@/app/_lib/features/apiSlice';
import {
  useCreateElectoralEntityMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { useElectoralEntitiesQuery } from '@/app/_services/fetchApi';

// Validation Schemas
import { addElectoralEntitySchema } from '@/app/_validation/electoral-entity';

export const useAddElectoralEntity = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createElectoralEntity, { isLoading: isLoadingElectoralEntity }] =
    useCreateElectoralEntityMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchElectoralEntities } = useElectoralEntitiesQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // Refs
  const fileRef = useRef<File | null>(null);

  // Form Setup
  const form = useForm<z.infer<typeof addElectoralEntitySchema>>({
    resolver: zodResolver(addElectoralEntitySchema),
    defaultValues: {
      name: '',
      logo: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    if (!fileRef.current) {
      toast.error('يجب ان ترفع صورة');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', fileRef.current as File);
      const response = await uploadFile(formData).unwrap();
      form.setValue('logo', `${baseURL}/${response?.data}`);
      const result = await createElectoralEntity(
        addElectoralEntitySchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetchElectoralEntities();
      setOpenAdd(false);
      form.reset();
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingElectoralEntity,
    refetchElectoralEntities,
    fileRef,
    isLoadingFile,
  };
};
