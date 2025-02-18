'use client';

import { useState, useEffect } from 'react';
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

import {
  useUsersQuery,
  useElectoralEntitiesQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addElectralAdminSchema } from '@/app/_validation/user';

export const useAddPartiesRepresenters = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();

  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
  { value: string; label: string }[]
>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

    const { data: electoralEntities, isLoading: isLoadingElectoralEntities, refetch: refetchElectoralEntities } =
      useElectoralEntitiesQuery('');
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addElectralAdminSchema>>({
    resolver: zodResolver(addElectralAdminSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      role: 10
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      form.setValue('role', 10);
      const result = await createUser(
        addElectralAdminSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.msg || 'An unexpected error occurred',
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };

    // Effect to Update Search Options
    useEffect( () =>
    {
      refetchElectoralEntities()
      if (!isLoadingElectoralEntities) {
        setElectoralEntitiesSearch(
          electoralEntities?.items.map((electoralEntity: any) => ({
            value: electoralEntity.id,
            label: electoralEntity.name
          }))
        );
      }
    }, [electoralEntities, isLoadingElectoralEntities, openAdd]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    electoralEntitiesSearch
  };
};
