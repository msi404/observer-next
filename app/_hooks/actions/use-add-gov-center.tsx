/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
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
import {toast} from 'sonner'

// API Services
import { useCreateGovCenterMutation } from '@/app/_services/mutationApi';
import {
  useGovCentersQuery,
  useProvincesQuery
} from '@/app/_services/fetchApi';

// Validation Schemas
import { addGovCenterSchema } from '@/app/_validation/gov-center';

export const useAddGovCenter = () =>
{
  const user = useSelector(selectUser)
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createGovCenter, { isLoading: isLoadingGovCenter }] =
    useCreateGovCenterMutation();

  // State Management
  const [govSearch, setGovSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  // Query Data
  const { refetch: refetchGovCenters } = useGovCentersQuery(
    `PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );

  const { data: provinces, isLoading: isLoadingProvinces } =
    useProvincesQuery('');


  // Form Setup
  const form = useForm<z.infer<typeof addGovCenterSchema>>({
    resolver: zodResolver(addGovCenterSchema),
    defaultValues: {
      name: '',
      govId: '',
      serial: '',
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      const result = await createGovCenter(
        addGovCenterSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetchGovCenters();
      setOpenAdd( false );
      form.reset()
    }
  };

  // Effect to Update Search Options
  useEffect(() => {
    if (!isLoadingProvinces) {
      setGovSearch(
        provinces?.data.items.map((gov: any) => ({
          value: gov.id,
          label: gov.name
        }))
      );
    }
  }, [provinces, isLoadingProvinces, openAdd]);

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingGovCenter,
    govSearch
  };
};
