/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import {
  useUsersQuery,
  useLazyGovCentersQuery,
  useIsUsernameTakenQuery,
  useLazyGovCenterQuery
} from '@/app/_services/fetchApi';
import {toast} from 'sonner'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCandidateSchema } from '@/app/_validation/user';
import { baseURL } from '@/app/_lib/features/apiSlice';

export const useEditCandidate = ({ item }: { item: User }) => {
  const user = useSelector(selectUser);
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);
  const [username, setUsername] = useState('');

  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';

  const { refetch } = useUsersQuery(
    `Role=102&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );
  const {
    data: isUsernameTaken,
    isSuccess: isUsernameTakenSuccess,
    refetch: refetchIsUsernameTaken
  } = useIsUsernameTakenQuery(username);
  const [selectedGovCenter, setSelectedGovCenter] = useState<string | null>(
    null
  );
  const [selectedCuta, setSelectedCuta] = useState<
    { religion: number | null; ethnicity: number | null }[] | []
  >([]);

  // State Management
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );
  
  const [
    fetchGovCenters,
    { data: lazyGovCenters, isFetching: isFetchingLazyGovCenter }
  ] = useLazyGovCentersQuery();

  const [fetchGovCenter, { data: govCenter, isLoading: isLoadingGovCenter }] =
    useLazyGovCenterQuery();

  const fileRef = useRef<File | null>(null);
  // Form Setup
  const form = useForm<z.infer<typeof editCandidateSchema>>({
    resolver: zodResolver(editCandidateSchema),
    defaultValues: {
      name: item.name,
      username: item.username,
      phone: item.phone,
      email: item.email,
      candidateSerial: item.candidateSerial,
      candidateListSerial: item.candidateListSerial,
      // @ts-ignore
      gender: String(item.gender), // ✅ Convert to string
      govCenterId: item.govCenter.id,
      // @ts-ignore
      religion: String(item.religion),
      // @ts-ignore
      ethnicity: String(item.ethnicity),
      // @ts-ignore
      dateOfBirth: new Date(item.dateOfBirth),
      profileImg: item.profileImg,
      role: 102
    }
  } );
    // Fetch Initial
    useEffect(() => {
      fetchGovCenters(`PageNumber=1&PageSize=${pageSize}`);
    }, [] );
  
  useEffect( () =>
  {
    if ( item.govCenter )
    {
      setSelectedGovCenter(item.govCenter.id)
    }
  }, [item.govCenter])
  
    useEffect(() => {
      if (selectedGovCenter) {
        fetchGovCenter(selectedGovCenter);
      }
    }, [fetchGovCenter, selectedGovCenter]);
  
    useEffect(() => {
      if (!isLoadingGovCenter) {
        const cutas = govCenter?.data?.gov?.cutasSpecifications.map(
          (cuta: any) => {
            return {
              ethnicity: cuta?.ethnicity,
              religion: cuta?.religion
            };
          }
        );
        setSelectedCuta(cutas);
      }
    }, [govCenter?.data?.gov?.cutasSpecifications, isLoadingGovCenter]);
  
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
  

  const onCheckUsernameTaken = () => {
    setUsername(form.getValues('username'));
    refetchIsUsernameTaken();
  };

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
        user: editCandidateSchema.parse(form.getValues()),
        id: item.id
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.msg || 'حدث خطأ، يرجى المحاولة مجدداً.');
    } finally {
      refetch();
      setOpenUpdate(false);
    }
  };

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
    fileRef,
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken,
    govCentersSearch,
    setSelectedGovCenter,
    onGovCenterScrollEnd,
    selectedCuta,
    isLoadingFile
  };
};
