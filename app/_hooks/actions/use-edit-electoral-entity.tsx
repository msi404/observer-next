/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import
	{
	useUpdateElectoralEntityMutation,
  useDeleteElectoralEntityMutation
} from '@/app/_services/mutationApi';
import {
  useElectoralEntitiesQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {addElectoralEntitySchema} from '@/app/_validation/electoral-entity'

export const useEditElectoralEntity = ({ item }: { item: GovCenter }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateElectoralEntity, { isLoading: isLoadingUpdate }] = useUpdateElectoralEntityMutation();
  const [deleteElectoralEntity, { isLoading: isLoadingDelete }] = useDeleteElectoralEntityMutation();


  // State Management
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { refetch } = useElectoralEntitiesQuery(
	`PageNumber=${currentPage}&PageSize=${pageSize}`
  );
  // Toast Hook
  const { toast } = useToast();

   // Form Setup
	const form = useForm<z.infer<typeof addElectoralEntitySchema>>({
		resolver: zodResolver(addElectoralEntitySchema),
    defaultValues: {
     name: item.name
		}
	 });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
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
    }
    finally
    {
      refetch();
		 setOpenUpdate( false );
		 form.reset()
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
  };
};
