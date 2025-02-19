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

// API Services
import { baseURL } from '@/app/_services/api';

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

import {
  useUsersQuery,
  useGovCentersQuery,
  usePollingCentersQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation, useUploadFileMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addObserverSchema } from '@/app/_validation/user';

export const useAddObserver = () =>
{
  const user = useSelector(selectUser)
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const { refetch } = useUsersQuery(
    `Role=104&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );
  const [govCentersSearch, setGovCentersSearch] = useState<
  { value: string; label: string }[]
  >( [] );
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
  { value: string; label: string }[]
  >( [] );
  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
      // Query Data
      const { data: govCenters, isLoading: isLoadingGovCenters, refetch: refetchGovCenters } =
      useGovCentersQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`);
      const { data: pollingCenters, isLoading: isLoadingPollingCenters, refetch: refetchPollingCenters } =
      usePollingCentersQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`);
  
    // Refs
    const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addObserverSchema>>({
    resolver: zodResolver(addObserverSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govCenterId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      stationCenterId: '',
      username: '',
      phone: '',
      profileImg: '',
      email: '',
      password: '',
      role: 104
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
           addObserverSchema.parse(form.getValues())
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
      }, [
        govCenters,
        pollingCenters,
        isLoadingGovCenters,
        isLoadingPollingCenters,
        openAdd
      ] );
  
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    isLoadingFile,
    govCentersSearch,
    pollingCentersSearch,
    fileRef
  };
};
