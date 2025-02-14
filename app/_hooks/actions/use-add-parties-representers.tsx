'use client';

import { useState } from 'react';
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
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addUserSchema } from '@/app/_validation/user';

export const useAddPartiesRepresenters = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();

  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${currentPage}&PageSize=${pageSize}`
  );
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
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
  const onSubmit = async (values: z.infer<typeof addUserSchema>) => {
    try {
      form.setValue('role', 10);
      const result = await createUser(
        addUserSchema.parse(form.getValues())
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
  };
};
