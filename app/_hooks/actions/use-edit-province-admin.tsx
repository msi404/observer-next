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
  useGovCentersQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProvinceAdminSchema } from '@/app/_validation/user';

export const useEditProvinceAdmins = ({ item }: { item: User }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [govCenterSearch, setGovCenterSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { data: govCenters, isLoading: isLoadingGovCenters} =
    useGovCentersQuery('');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addProvinceAdminSchema>>({
    resolver: zodResolver(addProvinceAdminSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      govCenterId: item.govCenter?.id,
      pollingCenterId: item.pollingCenter?.id,
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 102
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
    try {
      form.setValue('role', 102);
      await updateUser({
        user: addProvinceAdminSchema.parse(form.getValues()),
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
          description: error.data?.msg || 'An unexpected error occurred',
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
    if (!isLoadingGovCenters) {
      setGovCenterSearch(
        govCenters?.items.map((govCenter: any) => ({
          value: govCenter.id,
          label: govCenter.name
        }))
      );
    }
  }, [
    govCenters,
    isLoadingGovCenters,
    openUpdate
  ]);

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
    govCenterSearch,
  };
};
