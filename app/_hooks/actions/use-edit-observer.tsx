'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useUploadFileMutation,
  useDeleteUserMutation
} from '@/app/_services/mutationApi';
import {
  useUsersQuery,
  useGovCentersQuery,
  usePollingCentersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addObserverSchema } from '@/app/_validation/user';
import { baseURL } from '@/app/_services/api';

export const useEditObserver = ( { item }: { item: User; } ) =>
{
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [ deleteUser, { isLoading: isLoadingDelete } ] = useDeleteUserMutation();
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
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );
  const {
    data: govCenters,
    isLoading: isLoadingGovCenters,
    refetch: refetchGovCenters
  } = useGovCentersQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`);
  
  const { data: pollingCenters, isLoading: isLoadingPollingCenters, refetch: refetchPollingCenters } =
  usePollingCentersQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`);

  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addObserverSchema>>({
    resolver: zodResolver(addObserverSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date(item.birth),
      govCenterId: item.govCenter?.id,
      pollingCenterId: item.pollingCenter?.id,
      electoralEntityId: item.electoralEntity?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 104
    }
  });

  // Form Submission Handler
  const onUpdate = async () => {
   try {
         if (fileRef.current) {
           const formData = new FormData();
           formData.append('file', fileRef.current as File);
   
           const response = await uploadFile(formData).unwrap();
           form.setValue('profileImg', `${baseURL}/${response?.data}`);
         } else {
           form.setValue('profileImg', item.profileImg);
         }
         form.setValue('role', 102);
         await updateUser({
           user: addObserverSchema.parse(form.getValues()),
           id: item.id
         });
       } catch (error: any) {
         console.log(error); // Full error log for debugging
           toast({
             title: 'Error',
             description: error.data?.msg || 'An unexpected error occurred',
             variant: 'destructive'
           });
       } finally {
         refetch();
         setOpenUpdate(false);
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
    }, [govCenters, isLoadingGovCenters, pollingCenters, isLoadingPollingCenters,openUpdate]);
  

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
    govCentersSearch,
    pollingCentersSearch,
    fileRef,
    isLoadingFile
  };
};
