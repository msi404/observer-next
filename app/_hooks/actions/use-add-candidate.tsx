'use client';

import { useState, useEffect, useRef } from 'react';
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
import { baseURL } from '@/app/_services/api';
import {
  useUsersQuery,
  useGovCentersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateUserMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addCandidateSchema } from '@/app/_validation/user';

export const useAddCandidate = () =>
{
  const user = useSelector(selectUser)
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
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
    >( [] );
  
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id;

  // Query Data
    const { data: govCenters, isLoading: isLoadingGovCenters, refetch: refetchGovCenters } =
      useGovCentersQuery( `ElectoralEntityId=${electoralEntityId}` );
  
  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addCandidateSchema>>({
    resolver: zodResolver(addCandidateSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      phone: '',
      email: '',
      govCenterId: '',
      // @ts-ignore
      birth: '',
      profileImg: '',
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
        description: error.data?.msg || 'An unexpected error occurred',
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
    refetchGovCenters();
    if (!isLoadingGovCenters) {
      setGovCentersSearch(
        govCenters?.items.map((govCenter: any) => ({
          value: govCenter.id,
          label: govCenter.name
        }))
      );
    }
  }, [
    govCenters,
    isLoadingGovCenters,
    openAdd
  ]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingCandidate,
    govCentersSearch,
    fileRef
  };
};
