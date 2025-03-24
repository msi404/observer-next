/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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

import {toast} from 'sonner'

// API Services
import { baseURL } from '@/app/_lib/features/apiSlice';
import {
  useUsersQuery,
  useLazyGovCentersQuery,
  useIsUsernameTakenQuery
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
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);

  const [username, setUsername] = useState('')

  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingProvinceAdmin }] =
    useCreateUserMutation();
  const [ uploadFile, { isLoading: isLoadingFile } ] = useUploadFileMutation();

  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const { refetch } = useUsersQuery(
    `Role=12&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );

    const {data: isUsernameTaken, isSuccess: isUsernameTakenSuccess, refetch: refetchIsUsernameTaken} = useIsUsernameTakenQuery(username)
  
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);

  // State Management
  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
  
  const [
    fetchGovCenters,
    { data: lazyGovCenters, isFetching: isFetchingLazyGovCenter }
  ] = useLazyGovCentersQuery();


  // Refs
  const fileRef = useRef<File | null>(null);

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
      email: '',
      password: '',
      role: 12
    }
  } );

    // Fetch Initial
    useEffect( () =>
      {
        fetchGovCenters(`PageNumber=1&PageSize=${pageSize}`);
      }, []);
  
      useEffect(() => {
        if (lazyGovCenters) {
          setGovCentersSearch((prev) => [
            ...prev,
            ...lazyGovCenters.items.map((govCenter: any) => ({
              value: govCenter.id,
              label: govCenter.name
            }))
          ]);
          setGovCentersTotalPages(lazyGovCenters.totalPages);
        }
      }, [ lazyGovCenters ] );
    // Scroll Event Handler for Infinite Scroll
    const onGovCenterScrollEnd = () => {
      if (
        govCentersCurrentPage < govCentersTotalPages &&
        !isFetchingLazyGovCenter
      ) {
        setGovCentersCurrentPage((prev) => prev + 1);
        fetchGovCenters(
          `PageNumber=${govCentersCurrentPage + 1}&PageSize=${pageSize}`
        );
      }
    };
  
    const onCheckUsernameTaken = () =>
      {
        setUsername( form.getValues( 'username' ) )
        refetchIsUsernameTaken()
      }
  
  // Form Submission Handler
  const onSubmit = async () => {
    if (!fileRef.current) {
      toast.error('يجب ان ترفع صورة.')
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
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
      console.log(error);
    } finally {
      refetch();
      setOpenAdd( false );
      setUsername('')
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingFile,
    isLoadingProvinceAdmin,
    govCentersSearch,
    onGovCenterScrollEnd,
    isUsernameTakenSuccess,
    isUsernameTaken,
    onCheckUsernameTaken,
    fileRef
  };
};
