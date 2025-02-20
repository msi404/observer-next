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
  useLazyGovCentersQuery,
  useLazyPollingCentersQuery,
  useLazyStationsQuery
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
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const [pollingCentersCurrentPage, setPollingCentersCurrentPage] = useState(1);
  const [pollingCentersTotalPages, setPollingCentersTotalPages] = useState(1);
  const [stationsCurrentPage, setStationsCurrentPage] = useState(1);
  const [stationsTotalPages, setStationsTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector( selectCurrentPage );

    // State to track selected values
    const [selectedGovCenter, setSelectedGovCenter] = useState<string | null>(
      null
    );
    const [selectedPollingCenter, setSelectedPollingCenter] = useState<
      string | null
    >(null);
  
  
  // API Mutations & Queries
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [ deleteUser, { isLoading: isLoadingDelete } ] = useDeleteUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const { refetch } = useUsersQuery(
    `Role=104&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );

  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [stationsSearch, setStationsSearch] = useState<
    { value: string; label: string }[]
  >([]);


  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [ openDelete, setOpenDelete ] = useState<boolean>( false );

    // Lazy Query for Polling Centers
    const [
      fetchGovCenters,
      { data: lazyGovCenters, isFetching: isFetchingLazyGovCenter }
    ] = useLazyGovCentersQuery();
  
    const [
      fetchPollingCenters,
      { data: lazyPollingCenters, isFetching: isFetchingLazyPollingCenter }
    ] = useLazyPollingCentersQuery();
    const [
      fetchStations,
      { data: lazyStations, isFetching: isFetchingLazyStations }
    ] = useLazyStationsQuery();

  const fileRef = useRef<File | null>(null);

  // Toast Hook
  const { toast } = useToast();

  // Form Setup
  const form = useForm<z.infer<typeof addObserverSchema>>({
    resolver: zodResolver(addObserverSchema),
    defaultValues: {
      name: item.name,
      // @ts-ignore
      dateOfBirth: new Date( item.dateOfBirth ),
      electoralEntityId: item.electoralEntity?.id,
      govCenterId: item.govCenter?.id,
      pollingCenterId: item.pollingCenter?.id,
      stationId: item.station?.id,
      password: 'defaultPassword123', // Placeholder; handle securely in production
      username: item?.username,
      phone: item?.phone,
      email: item?.email,
      role: 104
    }
  } );

  useEffect( () =>
  {
    setSelectedGovCenter(item.govCenter.id)
    setSelectedPollingCenter( item.pollingCenter.id )
  }, [])
  
  // Fetch Initial
  useEffect( () =>
    {
      setStationsSearch([])
      setPollingCentersSearch([])
      fetchGovCenters(`PageNumber=1&PageSize=${pageSize}`);
    }, []);
  
    // When a GovCenter is selected, fetch Polling Centers
    useEffect( () =>
    {
      setPollingCentersSearch([]) // Clear previous polling centers
      if (selectedGovCenter) {
        fetchPollingCenters(
          `PageNumber=1&PageSize=${pageSize}&GovCenterId=${selectedGovCenter}`
        );
      } else {
        setPollingCentersSearch([]); // Reset if no selection
      }
    }, [selectedGovCenter]);
  
    // When a Polling Center is selected, fetch Stations
    useEffect(() => {
      setStationsSearch([]); // Clear previous stations
      if (selectedPollingCenter) {
        fetchStations(
          `PageNumber=1&PageSize=${pageSize}&PollingCenterId=${selectedPollingCenter}`
        );
      } else {
        setStationsSearch([]); // Reset if no selection
      }
    }, [selectedPollingCenter]);
  
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
    useEffect(() => {
      if (lazyPollingCenters) {
        setPollingCentersSearch((prev) => [
          ...prev,
          ...lazyPollingCenters.items.map((pollingCenter: any) => ({
            value: pollingCenter.id,
            label: pollingCenter.name
          }))
        ]);
        setPollingCentersTotalPages(lazyPollingCenters.totalPages);
      }
    }, [lazyPollingCenters]);
    useEffect(() => {
      if (lazyStations) {
        setStationsSearch((prev) => [
          ...prev,
          ...lazyStations.items.map((station: any) => ({
            value: station.id,
            label: station.serial
          }))
        ]);
        setStationsTotalPages(lazyStations.totalPages);
      }
    }, [lazyStations]);
  
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
    const onPollingCenterScrollEnd = () => {
      if (
        pollingCentersCurrentPage < pollingCentersTotalPages &&
        !isFetchingLazyPollingCenter
      ) {
        setPollingCentersCurrentPage((prev) => prev + 1);
        fetchPollingCenters(
          `PageNumber=${
            pollingCentersCurrentPage + 1
          }&PageSize=${pageSize}&GovCenterId=${selectedGovCenter}`
        );
      }
    };
    const onStationScrollEnd = () => {
      if (stationsCurrentPage < stationsTotalPages && !isFetchingLazyStations) {
        setStationsCurrentPage((prev) => prev + 1);
        fetchStations(
          `PageNumber=${
            stationsCurrentPage + 1
          }&PageSize=${pageSize}&PollingCenterId=${selectedPollingCenter}`
        );
      }
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
         form.setValue('electoralEntityId', electoralEntityId);
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
    stationsSearch,
    onGovCenterScrollEnd,
    onPollingCenterScrollEnd,
    onStationScrollEnd,
    setSelectedGovCenter,
    setSelectedPollingCenter,
    selectedGovCenter,
    selectedPollingCenter,
    fileRef,
    isLoadingFile
  };
};
