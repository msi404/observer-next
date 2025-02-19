'use client';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { Combobox } from '@/app/_components/combobox';
import {usePossibleVotersFilter} from '@/app/_hooks/filters/use-possible-voters-filter'
import { Filter } from 'lucide-react';
import { type Table } from '@tanstack/react-table';

export const FilterPossibleVotersForm = (table: Table<any>) => {
  const {
    open,
    setOpen,
    governoratesSearch,
    pollingCentersSearch,
	  usersSearch,
	  filters,
	  updateFilter,
	  setFilters,
    applyFilters,
   clearFilters
  } = usePossibleVotersFilter(table);
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
      <h1>المحافظة</h1>
      <Combobox
        options={governoratesSearch}
        value={filters.find((filter) => filter.id === 'province')?.value || ''}
        onChange={(value) =>
          setFilters((prev) => updateFilter(prev, 'province', value))
        }
        label="المحافظة"
      />
      <h1>مركز الاقتراع</h1>
      <Combobox
        options={pollingCentersSearch}
        value={
          filters.find((filter) => filter.id === 'pollingCenter')?.value || ''
        }
        onChange={(value) =>
          setFilters((prev) => updateFilter(prev, 'pollingCenter', value))
        }
        label="مركز الاقتراع"
      />
      <h1>المرشح</h1>
      <Combobox
        options={usersSearch}
        value={filters.find((filter) => filter.id === 'candidate')?.value || ''}
        onChange={(value) =>
          setFilters((prev) => updateFilter(prev, 'candidate', value))
        }
        label="المرشح"
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
