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

// API Services
import { useCreateNotificationMutation } from '@/app/_services/mutationApi';
import {useNotificationQuery} from '@/app/_services/fetchApi'

// Validation Schemas
import { addNotificationSchema } from '@/app/_validation/notifications';

export const useAddNotification = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createNotification, { isLoading: isLoadingNotification }] =
    useCreateNotificationMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchNotifications } = useNotificationQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addNotificationSchema>>({
    resolver: zodResolver(addNotificationSchema),
    defaultValues: {
		 title: '',
		 content: '',
		 role: 0
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
        description: error.data.title,
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
