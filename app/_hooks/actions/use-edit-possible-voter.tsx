'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateVoterMutation,
  useDeleteVoterMutation,
} from '@/app/_services/mutationApi';
import {
  useVotersQuery,
  usePollingCentersQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import {useToast} from '@/app/_hooks/use-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addPossibleVoterSchema } from '@/app/_validation/voter'

interface VoterItem
{
  id: string;
  name: string;
  birth: string;
  address: string;
  gender: string | number;
  pollingCenter: { id: string };
  candidate: { id: string };
  serial: string;
}

export const useEditPossibleVoter = ({ item }: { item: VoterItem }) => {
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateVoter, { isLoading: isLoadingUpdate }] =
    useUpdateVoterMutation();
  const [deleteVoter, { isLoading: isLoadingDelete }] =
    useDeleteVoterMutation();
  const { refetch } = useVotersQuery(
    `State=0&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [usersSearch, setUsersSearch] = useState<
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
  const { data: users, isLoading: isLoadingUsers} = useUsersQuery('Role=102');

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addPossibleVoterSchema>>({
    resolver: zodResolver(addPossibleVoterSchema),
    defaultValues: {
      name: item.name,
      dateOfBirth: new Date(item.birth),
      address: item.address,
      state: 0,
      // @ts-ignore
      gender: String(item.gender), // ✅ Convert to string
      pollingCenterId: item.pollingCenter?.id ?? '',
      candidateId: item.candidate?.id ?? '',
      serial: item.serial
    }
  } );
  // Form Submission Handler
  const onUpdate = async () => {
    try {
      	await updateVoter({
        voter: addPossibleVoterSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.msg || 'An unexpected error occurred',
        variant: 'destructive'
      });
      console.log(error);
    } finally {
      refetch();
      setOpenUpdate(false);
    }
  };

  // Effect to Update Search Options
  useEffect( () =>
  {
    if (!isLoadingUsers) {
      setUsersSearch(
        users?.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      );
    }
    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }
  }, [users, isLoadingUsers, pollingCenters, isLoadingPollingCenters, openUpdate]);

  const onDelete = async () => {
    await deleteVoter(item.id);
    refetch();
  };
	
	return {
		openDelete,
		openUpdate,
		setOpenDelete,
		setOpenUpdate,
		onDelete,
		isLoadingDelete,
		onUpdate,
		isLoadingUpdate,
		form,
		pollingCentersSearch,
		usersSearch,
	}
};
