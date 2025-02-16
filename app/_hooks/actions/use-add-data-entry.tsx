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
import { addDataEntrySchema } from '@/app/_validation/user';

export const useAddDataEntry = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();

  const { refetch } = useUsersQuery(
    `Role=100&PageNumber=${currentPage}&PageSize=${pageSize}`
  );
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addDataEntrySchema>>({
    resolver: zodResolver(addDataEntrySchema),
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
      role: 100
    }
  });

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addDataEntrySchema>) => {
    try {
      form.setValue('role', 100);
      const result = await createUser(
        addDataEntrySchema.parse(form.getValues())
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
