'use client';
import { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { type ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { Trash, Pencil } from 'lucide-react';

import {
  selectCurrentPage,
  selectPageSize
} from '@/app/_lib/features/paginationSlice';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { addVoterSchema } from '@/app/_validation/elecation-base';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DialogFooter, DialogClose } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/app/_components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/app/_components/ui/select';
import { Combobox } from '@/app/_components/combobox';
import TestCombobox from '@/app/_components/text-combobox';
import { Separator } from '@/app/_components/ui/separator';
import { Dropzone } from '@/app/_components/dropzone';
import { Show } from '@/app/_components/show';
import { cn } from '@/app/_lib/utils';
import { Spinner } from '@/app/_components/spinner';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { DatePicker } from '@/app/_components/date-picker';
import {
  useDeleteVoterMutation,
  useUpdateVoterMutation,
  useUploadFileMutation
} from '@/app/_services/mutationApi';
import {
  useVotersQuery,
  useUsersQuery,
  usePollingCentersQuery
} from '@/app/_services/fetchApi';
import { useToast } from '@/app/_hooks/use-toast';
import { calcAge } from '@/app/_utils/calc-age';
import { Zoom } from '@/app/_components/zoom';
import { baseURL } from '@/app/_services/api';

export const useColumns = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  const possibleVotersColumns: ColumnDef<PossibleVoters>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:possibleVoters.table.header.name')}
        />
      )
    },
    {
      accessorKey: 'address',
      header: t('electionBase:possibleVoters.table.header.address')
    },
    {
      accessorKey: 'state',
      header: t('electionBase:possibleVoters.table.header.governorate')
    },
    {
      accessorKey: 'pollingCenter',
      header: t('electionBase:possibleVoters.table.header.pollingCenter')
    },
    {
      accessorKey: 'dataEntry',
      header: t('electionBase:possibleVoters.table.header.dataEntry')
    },
    {
      accessorKey: 'candidate',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:possibleVoters.table.header.candidateName')}
        />
      )
    }
  ];

  // @ts-ignore
  const confirmedVotersColumns: ColumnDef<ConfirmedVoters>[] = [
    {
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.name')}
        />
      )
    },
    {
      accessorKey: 'dateOfBirth',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.age')}
        />
      ),
      cell: ({ cell }: { cell: any }) => {
        return (
          <span className="flex justify-center items-center">
            {calcAge(cell.getValue())}
          </span>
        );
      }
    },
    {
      accessorKey: 'pollingCenter.gov',
      header: t('electionBase:confirmedVoters.table.header.governorate')
    },
    {
      accessorKey: 'pollingCenter.name',
      header: t('electionBase:confirmedVoters.table.header.pollingCenter')
    },
    {
      accessorKey: 'gender',
      header: t('electionBase:confirmedVoters.table.header.gender'),
      cell: ({ cell }: { cell: any }) => {
        return <Fragment>{cell.getValue() === 0 ? 'ذكر' : 'انثى'}</Fragment>;
      }
    },
    {
      accessorKey: 'candidate.name',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.candidateName')}
        />
      )
    },
    {
      accessorKey: 'serial',
      header: t('electionBase:confirmedVoters.table.header.candidateNumber')
    },
    {
      accessorKey: 'img',
      header: t('electionBase:confirmedVoters.table.header.cardPhoto'),
      cell: ({ cell }: any) => {
        const value = cell.getValue();
        return <Zoom preview={value} />;
      }
    },
    hasPermission(user, 'view:confirmedVotersActions') && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: ({ row }: { row: any }) => {
        const currentPage = useSelector(selectCurrentPage);
        const pageSize = useSelector(selectPageSize);
        // API Mutations & Queries
        const [updateVoter, { isLoading: isLoadingUpdate }] =
          useUpdateVoterMutation();
        const [deleteVoter, { isLoading: isLoadingDelete }] =
          useDeleteVoterMutation();
        const [uploadFile, { isLoading: isLoadingFile }] =
          useUploadFileMutation();
        const { refetch } = useVotersQuery(
          `PageNumber=${currentPage}&PageSize=${pageSize}`
        );

        // State Management
        const [usersSearch, setUsersSearch] = useState<
          { value: string; label: string }[]
        >([]);
        const [pollingCentersSearch, setPollingCentersSearch] = useState<
          { value: string; label: string }[]
        >([]);
        const [openUpdate, setOpenUpdate] = useState<boolean>(false);
        const [openDelete, setOpenDelete] = useState<boolean>(false);

        // Query Data
        const { data: pollingCenters, isLoading: isLoadingPollingCenters } =
          usePollingCentersQuery('');
        const { data: users, isLoading: isLoadingUsers } =
          useUsersQuery('Role=102');

        // Refs
        const fileRef = useRef<File | null>(null);

        // Toast Hook
        const { toast } = useToast();

        // Form Setup
        const form = useForm<z.infer<typeof addVoterSchema>>({
          resolver: zodResolver(addVoterSchema),
          defaultValues: {
            name: row.original.name,
            dateOfBirth: new Date(row.original.dateOfBirth),
            img: row.original.img,
            address: '',
            // @ts-ignore
            gender: String(row.original.gender), // ✅ Convert to string
            pollingCenterId: String(row.original.pollingCenter.id),
            candidateId: String(row.original.candidate.id),
            serial: row.original.serial
          }
        });
        // Form Submission Handler
        const onUpdate = async () => {
          try {
            if (fileRef.current) {
              const formData = new FormData();
              formData.append('file', fileRef.current as File);

              const response = await uploadFile(formData).unwrap();
              form.setValue('img', `${baseURL}/${response?.data}`);
            } else {
              form.setValue('img', row.original.img);
            }
            console.log(row);
            const result = await updateVoter({
              voter: addVoterSchema.parse(form.getValues()),
              id: row.original.id
            });

            console.log(result);
          } catch (error: any) {
            toast({
              title: 'Error',
              description: error.data,
              variant: 'destructive'
            });
            console.log(error);
          } finally {
            refetch();
            setOpenUpdate(false);
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
        }, [users, isLoadingUsers, pollingCenters, isLoadingPollingCenters]);

        const onDelete = async () => {
          await deleteVoter(row.original.id);
          refetch();
        };
        return (
          <div className="flex justify-between items-center gap-2">
            <BasicDialog
              open={openDelete}
              onOpenChange={setOpenDelete}
              button={
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      damping: 0,
                      ease: 'linear',
                      duration: 0.2
                    }
                  }}
                  className="bg-slate-200 p-2 cursor-pointer rounded-full text-gray-500 hover:text-destructive"
                >
                  <Trash size="20px" />
                </motion.button>
              }
              title="حذف ناخب مؤكد"
              description="هل انت متأكد من انك تريد حذف العنصر؟"
            >
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isLoadingDelete}
                  >
                    حذف
                    {isLoadingDelete && (
                      <div className=" scale-125">
                        <Spinner />
                      </div>
                    )}
                  </Button>
                  <DialogClose asChild aria-label="Close">
                    <Button variant="outline" disabled={isLoadingDelete}>
                      الغاء
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </BasicDialog>
            <BasicDialog
              open={openUpdate}
              onOpenChange={setOpenUpdate}
              button={
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      damping: 0,
                      ease: 'linear',
                      duration: 0.2
                    }
                  }}
                  className="bg-slate-200 p-2 cursor-pointer rounded-full text-gray-500 hover:text-primary"
                >
                  <Pencil size="20px" />
                </motion.button>
              }
              title="تعديل ناخب مؤكد"
              description="ادخل المعطيات الاتية لتعديل عنصر"
            >
              <Form {...form}>
                <form
                  className="grid gap-5"
                  onSubmit={form.handleSubmit(onUpdate)}
                >
                  {/* Form Fields */}
                  <div className="grid gap-4">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className={cn(
                                form.formState.errors.name &&
                                  'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                              )}
                              disabled={isLoadingFile || isLoadingUpdate}
                              placeholder="اسم الناخب الثلاثي"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className={cn(
                                form.formState.errors.address &&
                                  'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                              )}
                              placeholder="العنوان"
                              disabled={isLoadingUpdate || isLoadingFile}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DatePicker
                              disabled={isLoadingUpdate || isLoadingFile}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Serial Number */}
                    <FormField
                      control={form.control}
                      name="serial"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className={cn(
                                form.formState.errors.serial &&
                                  'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                              )}
                              placeholder="رقم بطاقة الناخب"
                              disabled={isLoadingUpdate || isLoadingFile}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Gender */}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              disabled={isLoadingUpdate || isLoadingFile}
                              onValueChange={field.onChange}
                              defaultValue={field.value?.toString()}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="الجنس" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">ذكر</SelectItem>
                                <SelectItem value="1">انثى</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pollingCenterId"
                      render={({ field }) => (
                        <Combobox
                          options={pollingCentersSearch}
                          value={field.value} // Controlled by React Hook Form
                          onChange={field.onChange} // Updates React Hook Form on change
                          label="مركز الاقتراع"
                          disabled={isLoadingUpdate || isLoadingFile}
                          className={cn(
                            form.formState.errors.pollingCenterId &&
                              'border-destructive focus:border-destructive focus:ring-destructive'
                          )}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="candidateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Combobox
                              options={usersSearch}
                              value={field.value} // Controlled by React Hook Form
                              onChange={field.onChange} // Updates React Hook Form on change
                              label="المرشح"
                              disabled={isLoadingUpdate || isLoadingFile}
                              className={cn(
                                form.formState.errors.candidateId &&
                                  'border-destructive focus:border-destructive focus:ring-destructive'
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Image Upload */}
                    <Dropzone
                      setFile={(voterFile) => (fileRef.current = voterFile)}
                      label="اختيار صورة بطاقة الناخب"
                      defaultImage={row.original.img}
                    />
                    <Show when={fileRef.current === null}>
                      <span className="text-destructive">
                        يجب رفع صورة بطاقة الناخب
                      </span>
                    </Show>
                  </div>

                  {/* Separator */}
                  <div className="relative">
                    <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
                  </div>

                  {/* Form Actions */}
                  <DialogFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        type="submit"
                        onClick={onUpdate}
                        disabled={isLoadingUpdate || isLoadingFile}
                      >
                        تحديث
                        {(isLoadingUpdate || isLoadingFile) && (
                          <div className=" scale-125">
                            <Spinner />
                          </div>
                        )}
                      </Button>
                      <DialogClose asChild aria-label="Close">
                        <Button variant="outline" disabled={isLoadingUpdate || isLoadingFile}>
                          الغاء
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </BasicDialog>
          </div>
        );
      }
    }
  ].filter(Boolean);

  return {
    possibleVotersColumns,
    confirmedVotersColumns
  };
};
