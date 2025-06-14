/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { BasicDialog } from '@/app/_components/custom/basic-dialog';
import { Combobox } from '@/app/_components/custom/combobox';
import { Filter } from 'lucide-react';
import { type Table } from '@tanstack/react-table';
import {usePartiesRepresentersFilter} from '@/app/_hooks/filters/use-parties-representers-filter'

export const FilterPartiesRepresentersForm = (table: Table<any>) => {
  const {
    open,
    setOpen,
    electoralEntitiesSearch,
    onElectoralEntitiesScrollEnd,
	  filters,
	  updateFilter,
	  setFilters,
    applyFilters,
   clearFilters
  } = usePartiesRepresentersFilter(table);
  return (
    <BasicDialog
      className='!max-w-[425px]'
      open={open}
      onOpenChange={setOpen}
      button={
        <Button className="lg:w-1/4">
          تصفية <Filter />
        </Button>
      }
      title="تصفية"
      description="ادخل المعطيات الاتية لتصفية العناصر"
    >
      <Combobox
        options={electoralEntitiesSearch}
        value={ filters.find( ( filter ) => filter.id === 'electoralEntity' )?.value || '' }
        onScrollEnd={onElectoralEntitiesScrollEnd}
        onChange={ ( value ) =>
          setFilters((prev) => updateFilter(prev, 'electoralEntity', value))
        }
        label="الكيان"
      />
      <div className="relative">
        <Separator className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-screen" />
      </div>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <Button type="submit" onClick={applyFilters}>
            تصفية
          </Button>
          <DialogClose asChild aria-label="Close">
            <Button variant="outline" onClick={clearFilters}>الغاء</Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </BasicDialog>
  );
};
