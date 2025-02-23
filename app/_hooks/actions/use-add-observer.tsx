'use client';

import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
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
  useLazyGovCentersQuery,
  useLazyPollingCentersQuery,
  useLazyStationsQuery,
  useIsUsernameTakenQuery
} from '@/app/_services/fetchApi';
import {
  useCreateUserMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addObserverSchema } from '@/app/_validation/user';

export const useAddObserver = () => {
  const user = useSelector(selectUser);
  const [govCentersCurrentPage, setGovCentersCurrentPage] = useState(1);
  const [govCentersTotalPages, setGovCentersTotalPages] = useState(1);
  const [pollingCentersCurrentPage, setPollingCentersCurrentPage] = useState(1);
  const [pollingCentersTotalPages, setPollingCentersTotalPages] = useState(1);
  const [stationsCurrentPage, setStationsCurrentPage] = useState(1);
  const [stationsTotalPages, setStationsTotalPages] = useState(1);
  const pageSize = 10; // Fixed page size

  const globalPageSize = useSelector(selectPageSize);
  const globalCurrentPage = useSelector(selectCurrentPage);
  const [username, setUsername] = useState('')

  // State to track selected values
  const [selectedGovCenter, setSelectedGovCenter] = useState<string | null>(
    null
  );
  const [selectedPollingCenter, setSelectedPollingCenter] = useState<
    string | null
  >(null);

  // API Mutations & Queries
  const [createUser, { isLoading: isLoadingUser }] = useCreateUserMutation();
  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';
  const { refetch } = useUsersQuery(
    `Role=104&PageNumber=${globalCurrentPage}${electoralEntityIdQuery}&PageSize=${globalPageSize}`
  );
      const {data: isUsernameTaken, isSuccess: isUsernameTakenSuccess, refetch: refetchIsUsernameTaken} = useIsUsernameTakenQuery(username)
  
  const [govCentersSearch, setGovCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [stationsSearch, setStationsSearch] = useState<
    { value: string; label: string }[]
  >([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  // Query Data
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
      electoralEntityId: '',
      govCenterId: '',
      pollingCenterId: '',
      stationId: '',
      username: '',
      phone: '',
      profileImg: '',
      email: '',
      password: '',
      role: 104
    }
  });

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
  const onCheckUsernameTaken = () =>
    {
      setUsername( form.getValues( 'username' ) )
      refetchIsUsernameTaken()
    }
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
      form.setValue('electoralEntityId', electoralEntityId);
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

  return {
    openAdd,
    setOpenAdd,
    form,
    onSubmit,
    isLoadingUser,
    isLoadingFile,
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
    isUsernameTaken,
    isUsernameTakenSuccess,
    onCheckUsernameTaken,
    fileRef
  };
};
