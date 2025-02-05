'use client';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Combobox } from '@/app/_components/combobox';
import { Filter } from 'lucide-react';
import { type Table } from '@tanstack/react-table';
import {usePartiesRepresentersFilter} from '@/app/_hooks/filters/use-parties-representers-filter'

export const FilterPartiesRepresentersForm = (table: Table<any>) => {
  const {
    open,
    setOpen,
    governoratesSearch,
	  filters,
	  updateFilter,
	  setFilters,
    applyFilters,
   clearFilters
  } = usePartiesRepresentersFilter(table);
  return (
    <BasicDialog
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
        options={governoratesSearch}
        value={filters.find((filter) => filter.id === 'provinceOffice')?.value || ''}
        onChange={(value) =>
          setFilters((prev) => updateFilter(prev, 'provinceOffice', value))
        }
        label="المحافظة"
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
