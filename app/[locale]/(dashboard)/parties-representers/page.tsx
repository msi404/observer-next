'use client';
import {type NextPage} from 'next'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState
} from '@tanstack/react-table';

import { Container } from '@/app/_components/container';
import { Card, CardContent } from '@/app/_components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/_components/ui/tabs';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { confirmedVotersData, possibleVotersData } from '@/app/_utils/faker';
import Placeholder from '@/app/_assets/images/placeholder.png';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';
import { Trash, SquarePen } from 'lucide-react';
import { useAddConfirmedVoterDialog } from '@/app/_hooks/use-add-confirmed-voter-dialog';
import { useAddPossibleVoterDialog } from '@/app/_hooks/use-add-possible-voter-dialog';
import { useConfirmedVotersFilter } from '@/app/_hooks/use-confirmed-voter-filter';
import { usePossibleVotersFilter } from '@/app/_hooks/use-possible-voter-filter';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Spinner } from '@/app/_components/spinner';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Form, FormControl, FormField, FormItem } from '@/app/_components/ui/form';
import { Separator } from '@/app/_components/ui/separator';
import { Dropzone } from '@/app/_components/dropzone';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { DatePicker } from '@/app/_components/date-picker';
import { useForm } from 'react-hook-form';
import { addVoterSchema } from '@/app/_schema/elecationBase';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {cn} from '@/app/_lib/utils'

const PartiesRepresentersPage: NextPage = () => {
  const user = useSelector(selectUser);
  const AddConfirmedVoter = useAddConfirmedVoterDialog();
  const AddPossibleVoter = useAddPossibleVoterDialog();
  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [possibleVotersColumnFilter, setPossibledVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [confirmedVotersSorting, setConfirmedVotersSorting] =
    useState<SortingState>([]);
  const [possibleVotersSorting, setPossibleVotersSorting] =
    useState<SortingState>([]);
  const { t } = useTranslation();

  const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;
  const possibleVotrs: PossibleVoters[] = possibleVotersData;

  const possibleVotersColumns: ColumnDef<PossibleVotersHeader>[] = [
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
  const confirmedVotersColumns: ColumnDef<ConfirmedVotersHeader>[] = [
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
      accessorKey: 'address',
      header: t('electionBase:confirmedVoters.table.header.address')
    },
    {
      accessorKey: 'state',
      header: t('electionBase:confirmedVoters.table.header.governorate')
    },
    {
      accessorKey: 'pollingCenter',
      header: t('electionBase:confirmedVoters.table.header.pollingCenter')
    },
    {
      accessorKey: 'dataEntry',
      header: t('electionBase:confirmedVoters.table.header.dataEntry')
    },
    {
      accessorKey: 'candidate',
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.candidateName')}
        />
      )
    },
    {
      accessorKey: 'candidateNumber',
      header: t('electionBase:confirmedVoters.table.header.candidateNumber')
    },
    {
      accessorKey: 'cardPhoto',
      header: t('electionBase:confirmedVoters.table.header.cardPhoto'),
      cell: ({ row }: any) => (
        <Image
          placeholder="blur"
          blurDataURL={Placeholder.blurDataURL}
          width={48}
          height={48}
          src={row.getValue('cardPhoto') as string}
          alt="صورة البطاقة"
          className="w-12 h-12 rounded-lg"
        />
      )
    },
    hasPermission( user, 'view:confirmedVotersActions' ) && {
      id: 'actions',
      accessorKey: 'actions',
      header: 'الاجرائات',
      cell: () =>
      {
        const [openDelete, setOpenDelete] = useState<boolean>(false);
        const [ openEdit, setOpenEdit ] = useState<boolean>( false );
        const [ file, setFile ] = useState<File>()
          const form = useForm<z.infer<typeof addVoterSchema>>( {
            resolver: zodResolver( addVoterSchema ),
            defaultValues: {
              name: '',
              // @ts-ignore
              birthDate: '',
              gender: '',
              iDimage: '',
              address: '',
              pollingCenterId: '',
              candidateId: '',
              voterType: ''
            }
          } )
          const onSubmit = async ( values: z.infer<typeof addVoterSchema> ) =>
          {
            console.log( values );
            console.log(file);
          }
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
            <Button variant="destructive" disabled={false}>
              حذف
              {false && (
                <div className=" scale-125">
                  <Spinner />
                </div>
              )}
            </Button>
            <DialogClose asChild aria-label="Close">
              <Button variant="outline" disabled={false}>
                الغاء
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </BasicDialog>
      <BasicDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
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
            <SquarePen size="20px" />
          </motion.button>
        }
        title="تعديل ناخب مؤكد"
        description="ادخل المعطيات الاتية لتعديل عنصر"
            >
          <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
                        disabled={false}
                        placeholder="اسم الناخب الثلاثي"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="العنوان"
                        disabled={false}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="voterType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="رقم الناخب"
                        disabled={false}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="الجنس" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">انثى</SelectItem>
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
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="المركز"
                        disabled={false}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="candidateId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="المرشح"
                        disabled={false}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Dropzone setFile={ (voterFile) => setFile( voterFile ) } label="اختيار صورة الناخب" />
            </div>
            <div className=" relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" disabled={false}>
                  تعديل
                  {false && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button variant="outline" disabled={false}>
                    الغاء
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </BasicDialog>
        </div>
        )
      }
    }
  ].filter(Boolean)

  const confirmedVotersTable = useReactTable({
    data: confirmedVotrs,
    columns: confirmedVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setConfirmedVotersColumnFilter,
    onSortingChange: setConfirmedVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: confirmedVotersColumnFilter,
      sorting: confirmedVotersSorting
    }
  });
  const possibleVotersTable = useReactTable({
    data: possibleVotrs,
    columns: possibleVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPossibledVotersColumnFilter,
    onSortingChange: setPossibleVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: possibleVotersColumnFilter,
      sorting: possibleVotersSorting
    }
  });

  const FilterConfirmedVoters = useConfirmedVotersFilter(confirmedVotersTable);
  const FilterPossibleVoters = usePossibleVotersFilter(possibleVotersTable);

  const clearConfirmedVotersFilters = () => {
    confirmedVotersTable.setColumnFilters([]);
  };
  const clearPossibleVotersFilters = () => {
    possibleVotersTable.setColumnFilters([]);
  };
  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
            {t('electionBase:confirmedVoters.tabTitle')}
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
            {t('electionBase:possibleVoters.tabTitle')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="political-entities">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (confirmedVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      confirmedVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين مؤكدين"
                  />
                  <Dynamic component={FilterConfirmedVoters} />
                  <Show when={confirmedVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearConfirmedVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Show when={hasPermission(user, 'view:addConfirmedVoter')}>
                  <Dynamic component={AddConfirmedVoter} />
                </Show>
              </CardContent>
              <CardContent>
                <DynamicTable table={confirmedVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={confirmedVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (possibleVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      possibleVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين محتملين"
                  />
                  <Dynamic component={FilterPossibleVoters} />
                  <Show when={possibleVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearPossibleVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Show when={hasPermission(user, 'view:addPossibleVoter')}>
                  <Dynamic component={AddPossibleVoter} />
                </Show>
              </CardContent>
              <CardContent>
                <DynamicTable table={possibleVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={possibleVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default PartiesRepresentersPage;
