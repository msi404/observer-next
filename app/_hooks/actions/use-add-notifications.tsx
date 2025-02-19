'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
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
import { useCreateNotificationMutation } from '@/app/_services/mutationApi';
import {useMyNotificationQuery} from '@/app/_services/fetchApi'

// Validation Schemas
import { addNotificationSchema } from '@/app/_validation/notifications';

export const useAddNotification = () =>
{
  const user = useSelector(selectUser);
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createNotification, { isLoading: isLoadingNotification }] =
    useCreateNotificationMutation();

  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';

  // Query Data
  const { refetch: refetchNotifications } = useMyNotificationQuery(
    `PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addNotificationSchema>>({
    resolver: zodResolver(addNotificationSchema),
    defaultValues: {
		 title: '',
		 content: '',
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      const result = await createNotification(
        addNotificationSchema.parse(form.getValues())
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
      refetchNotifications();
      setOpenAdd( false );
      form.reset()
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingNotification,
  };
};
