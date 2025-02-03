'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import {selectCurrentPage, selectPageSize} from '@/app/_lib/features/paginationSlice'
// External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Hooks
import { useToast } from '@/app/_hooks/use-toast';

// API Services
import { baseURL } from '@/app/_services/api';
import {
  usePollingCentersQuery,
  useUsersQuery,
  useVotersQuery
} from '@/app/_services/fetchApi';
import {
  useUploadFileMutation,
  useCreateVoterMutation
} from '@/app/_services/mutationApi';

// Validation Schemas
import { addVoterSchema } from '@/app/_validation/elecation-base';

export  const useAddConfirmedVoter = () =>
  {
	  const pageSize = useSelector( selectPageSize )
	  const currentPage = useSelector(selectCurrentPage)
   // API Mutations & Queries
	const [createVoter, { isLoading: isLoadingVoter }] = useCreateVoterMutation();
	const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();
	const { refetch } = useVotersQuery(`PageNumber=${currentPage}&PageSize=${pageSize}`);

	// State Management
	const [usersSearch, setUsersSearch] = useState<{ value: string; label: string }[]>([]);
	const [pollingCentersSearch, setPollingCentersSearch] = useState<{ value: string; label: string }[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	
	// Query Data
	const { data: pollingCenters, isLoading: isLoadingPollingCenters } = usePollingCentersQuery('');
	const { data: users, isLoading: isLoadingUsers } = useUsersQuery('Role=102');
	
	// Refs
	const fileRef = useRef<File | null>(null);
	
	// Toast Hook
	const { toast } = useToast();
	
	// Form Setup
	const form = useForm<z.infer<typeof addVoterSchema>>({
	  resolver: zodResolver(addVoterSchema),
	  defaultValues: {
		 name: '',
		 // @ts-ignore
		 dateOfBirth: '',
		 img: '',
		 address: '',
		 pollingCenterId: '',
		 candidateId: '',
		 serial: ''
	  }
	});
	
	// Form Submission Handler
	const onSubmit = async (values: z.infer<typeof addVoterSchema>) => {
	  if (!fileRef.current) {
		 console.error("No file selected!");
		 return;
	  }	
	  try {
		 const formData = new FormData();
		 formData.append("file", fileRef.current as File);
		 
		 const response = await uploadFile(formData).unwrap();
		 form.setValue("img", `${baseURL}/${response?.data}`);
	
		 const result = await createVoter(addVoterSchema.parse(form.getValues())).unwrap();
	
		  console.log( result );
	  } catch (error: any) {
		 toast({
			title: "Error",
			description: error.data,
			variant: "destructive",
		 });
		 console.log(error);
	  } finally {
		 refetch();
		 setOpen(false);
	  }
	};
        // Effect to Update Search Options
        useEffect(() => {
			if (!isLoadingUsers) {
			  setUsersSearch(
				 users?.data.items.map((user: any) => ({
					value: user.id,
					label: user.name
				 }))
			  );
			}

			if (!isLoadingPollingCenters) {
			  setPollingCentersSearch(
				 pollingCenters?.data.items.map((pollingCenter: any) => ({
					value: pollingCenter.id,
					label: pollingCenter.name
				 }))
			  );
			}
		  }, [ users, isLoadingUsers, pollingCenters, isLoadingPollingCenters ] );
    return {
      open,
      setOpen,
      form,
      onSubmit,
      isLoadingFile,
      isLoadingVoter,
      pollingCentersSearch,
      usersSearch,
		 fileRef,
    }
  };
