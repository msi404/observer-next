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
import { useCreateElectoralEntityMutation } from '@/app/_services/mutationApi';
import {
  useElectoralEntitiesQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import { addElectoralEntitySchema } from '@/app/_validation/electoral-entity';

export const useAddElectoralEntity = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createElectoralEntity, { isLoading: isLoadingElectoralEntity }] =
    useCreateElectoralEntityMutation();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { refetch: refetchElectoralEntities } = useElectoralEntitiesQuery(
    `PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addElectoralEntitySchema>>({
    resolver: zodResolver(addElectoralEntitySchema),
    defaultValues: {
     name: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      const result = await createElectoralEntity(
        addElectoralEntitySchema.parse(form.getValues())
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
      refetchElectoralEntities();
      setOpenAdd( false );
      form.reset()
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingElectoralEntity,
    refetchElectoralEntities
  };
};
