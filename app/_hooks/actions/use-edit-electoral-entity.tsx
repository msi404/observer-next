/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateElectoralEntityMutation,
  useDeleteElectoralEntityMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import { useElectoralEntitiesQuery } from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addElectoralEntitySchema } from '@/app/_validation/electoral-entity';
import { baseURL } from '@/app/_lib/features/apiSlice';

export const useEditElectoralEntity = ({ item }: { item: ElectoralEntity }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateElectoralEntity, { isLoading: isLoadingUpdate }] =
    useUpdateElectoralEntityMutation();
  const [deleteElectoralEntity, { isLoading: isLoadingDelete }] =
    useDeleteElectoralEntityMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

  // State Management
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { refetch } = useElectoralEntitiesQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addElectoralEntitySchema>>({
    resolver: zodResolver(addElectoralEntitySchema),
    defaultValues: {
      name: item.name,
      logo: item?.logo
    }
  });

  // Form Submission Handler
  const onUpdate = async () =>
  {
    try {
      if (fileRef.current) {
        const formData = new FormData();
        formData.append('file', fileRef.current as File);

        const response = await uploadFile(formData).unwrap();
        form.setValue('logo', `${baseURL}/${response?.data}`);
      } else {
        form.setValue('logo', item?.logo);
      }
      await updateElectoralEntity({
        electoralEntity: addElectoralEntitySchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging
      toast({
        title: 'Error',
        description: error.data?.msg || 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      refetch();
      setOpenUpdate(false);
      form.reset();
    }
  };

  const onDelete = async () => {
    await deleteElectoralEntity(item.id);
    refetch();
  };
  return {
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    form,
    onUpdate,
    onDelete,
    isLoadingDelete,
    isLoadingUpdate,
    fileRef,
    isLoadingFile
  };
};
