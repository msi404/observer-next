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
import { useToast } from '@/app/_hooks/use-toast';

import {
  useUsersQuery,
  useLazyGovCentersQuery,
  useIsUsernameTakenQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addDataEntrySchema } from '@/app/_validation/user';

export const useAddDataEntry = () =>
{
  const user = useSelector(selectUser)
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector( selectCurrentPage );
  const [username, setUsername] = useState('')

  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const {data: isUsernameTaken, isSuccess: isUsernameTakenSuccess, refetch: refetchIsUsernameTaken} = useIsUsernameTakenQuery(username)

  const { refetch } = useUsersQuery(
    `Role=100&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );

  const [govCentersSearch, setGovCentersSearch] = useState<
  { value: string; label: string }[]
  >( [] );
  const [ openAdd, setOpenAdd ] = useState<boolean>( false );
    // Query Data
// Lazy Query for Polling Centers
  const [
    fetchGovCenters,
    {
      data: lazyGovCenters,
      isFetching: isFetchingLazyGovCenter,
    }
  ] = useLazyGovCentersQuery();
  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addDataEntrySchema>>({
    resolver: zodResolver(addDataEntrySchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govCenterId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      role: 100
    }
  } );
  
      // Fetch Initial
      useEffect(() => {
        fetchGovCenters( `PageNumber=1&PageSize=${ pageSize }` );
      }, [] );
  
   // Update When Data Changes
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
  }, [lazyGovCenters]);

// Scroll Event Handler for Infinite Scroll
const onGovCenterScrollEnd = () => {
  if (govCentersCurrentPage < govCentersTotalPages && !isFetchingLazyGovCenter) {
    setGovCentersCurrentPage((prev) => prev + 1);
    fetchGovCenters(`PageNumber=${govCentersCurrentPage + 1}&PageSize=${pageSize}`);
  }
};
  
const onCheckUsernameTaken = () =>
  {
    setUsername( form.getValues( 'username' ) )
    refetchIsUsernameTaken()
  }

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof addDataEntrySchema>) => {
    try {
      form.setValue('role', 100);
      const result = await createUser(
        addDataEntrySchema.parse(form.getValues())
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
  
  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    govCentersSearch,
    onGovCenterScrollEnd,
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken
  };
};
