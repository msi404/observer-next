'use client';
import { useState, useEffect } from 'react';
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
  useUsersQuery,
  useElectoralEntitiesQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserSchema } from '@/app/_validation/user';

interface PartiesRepresentersItem {
  id: string;
  name: string;
  dateOfBirth: string;
  pollingCenter: { id: string };
  electoralEntity: { id: string };
  govId: string;
  phone: string;
  password: string;
  username: string;
  email: string;
}

export const useEditPartiesRepresenters = ({ item }: { item: PartiesRepresentersItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${currentPage}&PageSize=${pageSize}`
  );  

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
  { value: string; label: string }[]
    >( [] );
  
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );
  
    const { data: elecotralEntities, isLoading: isLoadingElecotralEntities } =
      useElectoralEntitiesQuery('');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      govId: item.govId,
      pollingCenterId: item.pollingCenter?.id,
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 10
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      form.setValue('role', 10);
      await updateUser({
        user: addUserSchema.parse(form.getValues()),
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

    // Effect to Update Search Options
    useEffect( () =>
      {
        if (!isLoadingElecotralEntities) {
          setElectoralEntitiesSearch(
            elecotralEntities?.items.map((electoralEntity: any) => ({
              value: electoralEntity.id,
              label: electoralEntity.name
            }))
          );
        }
      }, [elecotralEntities, isLoadingElecotralEntities, openUpdate]);

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
    electoralEntitiesSearch
  };
};
