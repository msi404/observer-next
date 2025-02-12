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
  useElectoralEntitiesQuery,
  useProvincesQuery,
  useUsersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateUserMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addCandidateSchema } from '@/app/_validation/user';

export const useAddCandidate = () => {
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createVoter, { isLoading: isLoadingCandidate }] =
    useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useUsersQuery(
    `Role=102&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  // State Management
  const [usersSearch, setUsersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
  const {
    data: pollingCenters,
    isLoading: isLoadingPollingCenters,
    refetch: refetchPollingCenters
  } = usePollingCentersQuery('');
  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers
  } = useUsersQuery('Role=102');
  const {
    data: electoralEntities,
    isLoading: isLoadingElectoralEntities,
    refetch: refetchElectoralEntities
  } = useElectoralEntitiesQuery('');

  const { data: provinces, isLoading: isLoadingProvinces, refetch: refetchProvinces } =
    useProvincesQuery( '' );
  
    const [governoratesSearch, setGovernoratesSearch] = useState<
    { label: string; value: string }[]
  >([]);

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addCandidateSchema>>({
    resolver: zodResolver(addCandidateSchema),
    defaultValues: {
      name: '',
      govId: '',
      username: '',
      password: '',
      phone: '',
      email: '',
      // @ts-ignore
      candidateSerial: '',
      // @ts-ignore
      candidateListSerial: '',
      // @ts-ignore
      dateOfBirth: '',
      profileImg: '',
      electoralEntityId: '',
      pollingCenterId: '',
      role: 102
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
      form.setValue('profileImg', `${baseURL}/${response?.data}`);
      const result = await createVoter(
        addCandidateSchema.parse(form.getValues())
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
      refetch();
      setOpenAdd(false);
    }
  };
  // Effect to Update Search Options
  useEffect(() => {
    refetchElectoralEntities();
    if (!isLoadingElectoralEntities) {
      setElectoralEntitiesSearch(
        electoralEntities?.data.items.map((electoralEntity: any) => ({
          value: electoralEntity.id,
          label: electoralEntity.name
        }))
      );
    }
    refetchProvinces()
    if (!isLoadingProvinces) {
      const governorates = provinces?.data.items.map(
        (province: { name: string, id: string }) => ({
          label: province.name,
          value: province.id
        })
      );
      setGovernoratesSearch(governorates);
    }
    refetchUsers();
    if (!isLoadingUsers) {
      setUsersSearch(
        users?.data.items.map((user: any) => ({
          value: user.id,
          label: user.name
        }))
      );
    }

    refetchPollingCenters();
    if (!isLoadingPollingCenters) {
      setPollingCentersSearch(
        pollingCenters?.data.items.map((pollingCenter: any) => ({
          value: pollingCenter.id,
          label: pollingCenter.name
        }))
      );
    }
  }, [
    users,
    isLoadingUsers,
    pollingCenters,
    isLoadingPollingCenters,
    electoralEntities,
    isLoadingElectoralEntities,
    provinces,
    isLoadingProvinces,
    openAdd
  ]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingCandidate,
    pollingCentersSearch,
    electoralEntitiesSearch,
    governoratesSearch,
    usersSearch,
    fileRef
  };
};
