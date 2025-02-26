'use client';

import { useState, useEffect } from 'react';
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

import {
  useUsersQuery,
  useLazyElectoralEntitiesQuery,
  useIsUsernameTakenQuery
} from '@/app/_services/fetchApi';
import { useCreateUserMutation } from '@/app/_services/mutationApi';

// Validation Schemas
import { addElectralAdminSchema } from '@/app/_validation/user';

export const useAddPartiesRepresenters = () => {
  const [electoralEntitiesCurrentPage, setElectoralEntitiesCurrentPage] =
    useState(1);
  const [electoralEntitiessTotalPages, setElectoralEntitiesTotalPages] =
    useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector( selectCurrentPage );
  const [username, setUsername] = useState('')

  // API Mutations & Queries
  const [ createUser, { isLoading: isLoadingUser } ] = useCreateUserMutation();
  
  const {data: isUsernameTaken, isSuccess: isUsernameTakenSuccess, refetch: refetchIsUsernameTaken} = useIsUsernameTakenQuery(username)

  const { refetch } = useUsersQuery(
    `Role=10&PageNumber=${globalCurrentPage}&PageSize=${globalPageSize}`
  );

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const [
    fetchElectoralEntities,
    { data: lazyElectoralEntities, isFetching: isFetchingLazyElectoralEntities }
  ] = useLazyElectoralEntitiesQuery();

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addElectralAdminSchema>>({
    resolver: zodResolver(addElectralAdminSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      dateOfBirth: '',
      govId: '',
      pollingCenterId: '',
      electoralEntityId: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      role: 10
    }
  } );
  
     // Fetch Initial
     useEffect(() => {
      fetchElectoralEntities(`PageNumber=1&PageSize=${ pageSize }`);
     }, [] );
  
  // Update When Data Changes
  useEffect(() => {
    if (lazyElectoralEntities) {
      setElectoralEntitiesSearch((prev) => [
        ...prev,
        ...lazyElectoralEntities.items.map((electoralEntity: any) => ({
          value: electoralEntity.id,
          label: electoralEntity.name
        }))
      ]);
      setElectoralEntitiesTotalPages(lazyElectoralEntities.totalPages);
    }
  }, [lazyElectoralEntities]);

// Scroll Event Handler for Infinite Scroll
const onElectoralEntitiesScrollEnd = () => {
  if (electoralEntitiesCurrentPage < electoralEntitiessTotalPages && !isFetchingLazyElectoralEntities) {
    setElectoralEntitiesCurrentPage((prev) => prev + 1);
    fetchElectoralEntities(`PageNumber=${ electoralEntitiesCurrentPage + 1}&PageSize=${ pageSize }`);
  }
};
  
  const onCheckUsernameTaken = () =>
  {
    setUsername( form.getValues( 'username' ) )
    refetchIsUsernameTaken()
  }

  // Form Submission Handler
  const onSubmit = async () => {
    try {
      form.setValue('role', 10);
      const result = await createUser(
        addElectralAdminSchema.parse(form.getValues())
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
      setOpenAdd( false );
      setUsername('')
    }
  };

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    electoralEntitiesSearch,
    onElectoralEntitiesScrollEnd,
    onCheckUsernameTaken,
    isUsernameTakenSuccess,
    isUsernameTaken
  };
};
