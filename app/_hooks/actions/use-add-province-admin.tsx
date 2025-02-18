'use client';

import { useState, useRef, useEffect } from 'react';
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
import { addProvinceAdminSchema } from '@/app/_validation/user';

export const useAddProvinceAdmin = () =>
{
  const user = useSelector(selectUser)
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingProvinceAdmin }] =
    useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${currentPage}&PageSize=${pageSize}`
  );

  const [govCenterSearch, setGovCenterSearchSearch] = useState<
  { value: string; label: string }[]
>([]);

  // State Management
  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id;

      const { data: goveCenters, isLoading: isLoadingGovCenters, refetch: refetchGovCenters } =
        useGovCentersQuery(`ElectoralEntityId=${electoralEntityId}`);

  // Refs
  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addProvinceAdminSchema>>({
    resolver: zodResolver(addProvinceAdminSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      profileImg: '',
      phone: '',
      email: '',
      password: '',
      role: 12
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
      const result = await createUser(
        addProvinceAdminSchema.parse(form.getValues())
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
      useEffect( () =>
      {
        refetchGovCenters()
        if (!isLoadingGovCenters) {
          setGovCenterSearchSearch(
            goveCenters?.items.map((govCenter: any) => ({
              value: govCenter.id,
              label: govCenter.name
            }))
          );
        }
      }, [goveCenters, isLoadingGovCenters, openAdd]);
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingProvinceAdmin,
    govCenterSearch,
    fileRef
  };
};
