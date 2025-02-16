'use client';

import { useState, useEffect, useRef } from 'react';
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
import { baseURL } from '@/app/_services/api';
import {
  usePollingCentersQuery,
  useUsersQuery,
  useVotersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateVoterMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addConfirmedVoterSchema } from '@/app/_validation/voter';

export const useAddConfirmedVoter = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createVoter, { isLoading: isLoadingVoter }] = useCreateVoterMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useVotersQuery(
    `State=2&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [usersSearch, setUsersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const { data: pollingCenters, isLoading: isLoadingPollingCenters, refetch: refetchPollingCenters } =
    usePollingCentersQuery('');
  const { data: users, isLoading: isLoadingUsers, refetch: refetchUsers } = useUsersQuery('Role=102');

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addConfirmedVoterSchema>>({
    resolver: zodResolver(addConfirmedVoterSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      img: '',
		address: '',
		state: 2,
      pollingCenterId: '',
      candidateId: '',
      serial: ''
    }
  });

  // Form Submission Handler
  const onSubmit = async () => {
    if (!fileRef.current) {
      toast({
        title: 'لايوجد صورة',
        description: 'يجب ان ترفع صورة',
        variant: 'destructive'
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', fileRef.current as File);

      const response = await uploadFile(formData).unwrap();
      form.setValue('img', `${baseURL}/${response?.data}`);
      form.setValue('state', 2);
      const result = await createVoter(
        addConfirmedVoterSchema.parse(form.getValues())
      ).unwrap();

      console.log(result);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data.title,
        variant: 'destructive'
      });
    } finally {
      refetch();
      setOpenAdd(false);
    }
  };
  // Effect to Update Search Options
	useEffect( () =>
  {
    refetchUsers()
    if (!isLoadingUsers) {
      setUsersSearch(
        users?.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      );
    }
    refetchPollingCenters()
    if ( !isLoadingPollingCenters )
    {
      setPollingCentersSearch(
        pollingCenters?.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }
  }, [users, isLoadingUsers, pollingCenters, isLoadingPollingCenters, openAdd]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingVoter,
    pollingCentersSearch,
    usersSearch,
    fileRef
  };
};
