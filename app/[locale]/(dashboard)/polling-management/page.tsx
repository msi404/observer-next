'use client';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
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
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';
import { CirclePlus } from 'lucide-react';
import { confirmedVotersData } from '@/app/_utils/faker';

const useAddPartyDialog = () => {
  const [open, setOpen] = useState(false);

  const DialogComponent = useMemo(
    () => (
      <BasicDialog
        open={open}
        onOpenChange={setOpen}
        buttonLabel="اضافة"
        buttonIcon={<CirclePlus />}
        title="اضافة كيان سياسي"
        description="ادخل المعطيات الاتية لاضافة عنصر"
        primaryAction={<Button type="submit">اضافة</Button>}
        secondaryAction={<Button variant="outline">الغاء</Button>}
      >
        <Input placeholder="اسم الكيان" />
        <Input placeholder="رقم القائمة" />
      </BasicDialog>
    ),
    [open]
  );

  return DialogComponent;
};

const PollingMangementPage = () => {
  const [partyColumnFilter, setPartyColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [partySorting, setPartySorting] =
    useState<SortingState>([]);
  const { t } = useTranslation();

  const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;

  const partyColumns: ColumnDef<PossibleVotersHeader>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='الاسم'
        />
      )
    },
    {
      accessorKey: 'address',
      header: 'رقم القائمة'
    },
    {
      accessorKey: 'state',
      header: 'تاريخ الانشاء'
    },
  ];

  const partyTable = useReactTable({
    data: confirmedVotrs,
    columns: partyColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPartyColumnFilter,
    onSortingChange: setPartySorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: partyColumnFilter,
      sorting: partySorting
    }
  } );
  
  const clearPartyFilters = () => {
    partyTable.setColumnFilters([]);
  };
 
  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
            الكيانات السياسية
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
            التوزيع الانتخابي
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
                      (partyTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      partyTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن اسم الكيان"
                  />
                  <Show when={partyColumnFilter.length > 0}>
                    <Button
                      onClick={clearPartyFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Dynamic component={useAddPartyDialog()} />
              </CardContent>
              <CardContent>
                <DynamicTable table={partyTable} />
                <DataTablePagination
                  className="mt-12"
                  table={partyTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">

        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default PollingMangementPage;
