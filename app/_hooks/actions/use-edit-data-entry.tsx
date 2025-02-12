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
  useElectoralEntitiesQuery,
  usePollingCentersQuery,
  useGovCentersQuery,
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
  dateOfBirth: string;
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

  // State Management
  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [govCenterSearch, setGovCenterSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // Query Data
  const { data: pollingCenters, isLoading: isLoadingPollingCenters} =
    usePollingCentersQuery('');

  const { data: electoralEntities, isLoading: isLoadingElectoralEntities} =
    useElectoralEntitiesQuery('');

  const { data: govCenters, isLoading: isLoadingGovCenters} =
    useGovCentersQuery('');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addDataEntrySchema>>({
    resolver: zodResolver(addDataEntrySchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
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
  // Effect to Update Search Options
  useEffect( () =>
  {
    if (!isLoadingElectoralEntities) {
      setElectoralEntitiesSearch(
        electoralEntities?.data.items.map((electoralEntity: any) => ({
          value: electoralEntity.id,
          label: electoralEntity.name
        }))
      );
    }

    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.data.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }

    if (!isLoadingGovCenters) {
      setGovCenterSearch(
        govCenters?.data.items.map((govCenter: any) => ({
          value: govCenter.gov.id,
          label: govCenter.gov.name
        }))
      );
    }
  }, [
    electoralEntities,
    isLoadingElectoralEntities,
    pollingCenters,
    isLoadingPollingCenters,
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
    pollingCentersSearch,
    electoralEntitiesSearch
  };
};
