'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation
} from '@/app/_services/mutationApi';
import {
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDataEntrySchema } from '@/app/_validation/user';

interface DataEntryItem {
  id: string;
  name: string;
  birth: string;
  pollingCenter: { id: string };
  electoralEntity: { id: string };
  govId: string;
  phone: string;
  password: string;
  username: string;
  email: string;
}

export const useEditDataEntry = ({ item }: { item: DataEntryItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { refetch } = useUsersQuery(
    `Role=100&PageNumber=${currentPage}&PageSize=${pageSize}`
  );


  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);


  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addDataEntrySchema>>({
    resolver: zodResolver(addDataEntrySchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.birth),
      govId: null,
      pollingCenterId: null,
      electoralEntityId: null,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 100
    }
  });

  // Form Submission Handler
  const onUpdate = async (values: z.infer<typeof addDataEntrySchema>) => {
    try {
      form.setValue('role', 100);
      await updateUser({
        user: addDataEntrySchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error); // Full error log for debugging

      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', '),
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: error.data || 'An unexpected error occurred',
          variant: 'destructive'
        });
      }
    }
    finally
    {
      refetch();
      setOpenUpdate(false);
    }
  };

  const onDelete = async () => {
    await deleteUser(item.id);
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
